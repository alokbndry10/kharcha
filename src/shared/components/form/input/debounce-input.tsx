import { useScreenSize } from '@shared/hooks/use-screen';
import { Input, InputProps, InputRef, Progress } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

interface DebounceInputProps {
  placeholder?: string;
  setDebouncedValue: (value: string) => void;
  defaultValue?: string;
  searchIcon?: boolean;
}

const timer = 1500;

export function DebounceInput(props: DebounceInputProps & InputProps) {
  const { isMobile } = useScreenSize();
  const [progressbarValue, setProgressbarValue] = useState(0);
  const { placeholder = 'Search', setDebouncedValue, searchIcon, ...rest } = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    const set = setTimeout(() => setDebouncedValue(value), timer);

    return () => {
      clearTimeout(set);
    };
  }, [value]);

  // progress bar interval
  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let interval: NodeJS.Timeout | undefined;

    setProgressbarValue(0);
    if (!value) {
      clearInterval(interval);
      setProgressbarValue(0);
      return;
    }

    clearInterval(interval);

    interval = setInterval(() => {
      setProgressbarValue((prev) => {
        const newValue = prev + 15;
        return newValue <= 100 ? newValue : 100;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [value]);

  const debounceRef = useRef<InputRef>(null);
  useEffect(() => {
    if (!isMobile) debounceRef.current?.focus(); // do not auto focus in mobile
  }, []);

  useEffect(() => {
    setValue(props.defaultValue || '');
  }, [props.defaultValue]);

  return (
    <div className="relative w-full">
      <Input
        prefix={searchIcon === false ? undefined : <RiSearchLine />}
        value={value}
        ref={debounceRef}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        {...rest}
      />
      <div className="z-10 absolute -bottom-0.5 w-full">
        <Progress
          size="small"
          style={{
            display: 'block',
            lineHeight: 0,
            visibility: progressbarValue > 0 && progressbarValue < 100 ? 'visible' : 'hidden',
          }}
          percent={progressbarValue}
          strokeColor={'var(--color-primary-500)'}
          showInfo={false}
        />
      </div>
    </div>
  );
}
