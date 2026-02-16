import { ItemType } from 'antd/es/menu/interface';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormHandleSubmit } from 'react-hook-form';

export type DndFormValues = {
  status: string;
  time: string;
  date: string;
};

export type ProfileDropdownContainerProps = {
  userName: string;
  profileUrl: string;
  loading: boolean;
  handleLogout: VoidFunction;
  userRole?: string | null;
};

export type SuggestedStatusProps = {
  emoticon: string;
  message: string;
  duration: number;
  time: string;
};

export type DndModalProps = {
  open: boolean;
  handleModalClose: VoidFunction;
  handleSubmit: UseFormHandleSubmit<DndFormValues, DndFormValues>;
  onSubmit: (data: DndFormValues) => void;
  control: Control<DndFormValues, DndFormValues>;
  statusValue: string;
  handleDateChange: (date: Dayjs | null) => void;
  selectedDateTime: Dayjs | null;
  handleTimeChange: (time: Dayjs | null) => void;
  setMessage: (message: string) => void;
  emoji: string;
  items?: ItemType[];
  handleSuggestedStatus: (suggestion: SuggestedStatusProps) => void;
  updatingUserStatus: boolean;
  timezoneDate?: string;
  setEmoji: Dispatch<SetStateAction<string>>;
};

export type DefinedTimeContentProps = {
  definedTime: { value: number; label: string }[] | undefined;
  userActiveStatus: boolean;
  profileUrl: string;
  message?: string | null;
  awayStatus?: string | null;
  handleDurationSelect: (seconds: number) => void;
  handleOpen: VoidFunction;
  icon: React.ReactNode;
  timeLabel?: string;
  awayTime?: string;
};
