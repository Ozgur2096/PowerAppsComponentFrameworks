import { IInputs, IOutputs } from './generated/ManifestTypes';

export class PickIconControl
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private container: HTMLDivElement;
  private inputElement: HTMLInputElement;
  private iconElement: HTMLElement;
  private icon: string;
  private notifyOutputChanged: () => void;

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;

    // Create input
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'number';
    this.inputElement.classList.add('pi-input');
    this.inputElement.id = 'pi-input-field';

    const inputValue = context.parameters.inputBoxValue.raw;
    this.inputElement.value =
      inputValue !== null && inputValue !== undefined
        ? inputValue.toString()
        : '';
    this.inputElement.classList.add('pi-input');

    // Handle value change
    this.inputElement.addEventListener('input', () => {
      this.notifyOutputChanged();
    });

    // Create icon element
    this.iconElement = document.createElement('span');
    this.iconElement.classList.add('pi-icon');

    // Append elements
    this.container.appendChild(this.inputElement);
    this.container.appendChild(this.iconElement);

    this.updateView(context);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const iconType = context.parameters.typeSymbol.raw || '';
    this.icon = iconType;
    this.iconElement.textContent = iconType;

    const newValue = context.parameters.inputBoxValue.raw;
    this.inputElement.value =
      newValue !== null && newValue !== undefined ? newValue.toString() : '';
  }

  public getOutputs(): IOutputs {
    const parsedValue = parseFloat(this.inputElement.value);
    return {
      inputBoxValue: isNaN(parsedValue) ? undefined : parsedValue,
    };
  }

  public destroy(): void {
    // Optional cleanup
  }
}
