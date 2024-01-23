import { DatePicker, Popover, type PopoverProps } from '@affine/component';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import { datePickerTriggerInput } from './date-select.css';

const datePickerPopperContentOptions: PopoverProps['contentOptions'] = {
  style: { padding: 20, marginTop: 10 },
};

export const DateSelect = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const [open, setOpen] = useState(false);

  const onDateChange = useCallback(
    (e: string) => {
      setOpen(false);
      onChange(dayjs(e, 'YYYY-MM-DD').valueOf());
    },
    [onChange]
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      contentOptions={datePickerPopperContentOptions}
      content={
        <DatePicker
          value={dayjs(value as number).format('YYYY-MM-DD')}
          onChange={onDateChange}
        />
      }
    >
      <input
        value={dayjs(value as number).format('MMM DD')}
        className={datePickerTriggerInput}
      />
    </Popover>
  );
};
