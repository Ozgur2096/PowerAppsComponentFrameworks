import {
  ChoiceGroup,
  IChoiceGroupOption,
} from '@fluentui/react/lib/ChoiceGroup';
import * as React from 'react';

export interface ChoicesPickerComponentProps {
  label: string;
  value: number | null;
  options: ComponentFramework.PropertyHelper.OptionMetadata[];
  configuration: string | null;
  onChange: (newValue: number | undefined) => void;
}

export const ChoicesPickerComponent = React.memo(
  (props: ChoicesPickerComponentProps) => {
    const { label, value, options, configuration, onChange } = props;
    const valueKey = value != null ? value.toString() : undefined;
    const items = React.useMemo(() => {
      let iconMapping: Record<number, string> = {};
      let configError: string | undefined;
      if (configuration) {
        try {
          iconMapping = JSON.parse(configuration) as Record<number, string>;
        } catch {
          configError = `Invalid configuration: '${configuration}'`;
        }
      }

      return {
        error: configError,
        choices: options.map((item) => {
          return {
            key: item.Value.toString(),
            value: item.Value,
            text: item.Label,
            iconProps: { iconName: iconMapping[item.Value] },
          } as IChoiceGroupOption;
        }),
      };
    }, [options, configuration]);

    const onChangeChoiceGroup = React.useCallback(
      (ev?: unknown, option?: IChoiceGroupOption): void => {
        onChange(option ? (option.value as number) : undefined);
      },
      [onChange]
    );

    return (
      <>
        {items.error}
        <ChoiceGroup
          label={label}
          options={items.choices}
          selectedKey={valueKey}
          onChange={onChangeChoiceGroup}
        />
      </>
    );
  }
);
ChoicesPickerComponent.displayName = 'ChoicesPickerComponent';
