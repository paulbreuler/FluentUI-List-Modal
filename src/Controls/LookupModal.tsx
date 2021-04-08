import * as React from "react";
import { contentStyles, iconButtonStyles } from "./styles/LookupModal-styles";
import {
  Modal,
  IconButton,
  IIconProps,
  initializeIcons,
  PrimaryButton,
  Stack,
  IStackTokens,
  IStackItemStyles
} from "@fluentui/react";
import {
  DetailsListSimple,
  IDetailsListSimpleProps,
  IListItem
} from "./DetailsListSimple";
initializeIcons();

const cancelIcon: IIconProps = { iconName: "Cancel" };

export interface ILookupModalProps extends IDetailsListSimpleProps {
  isModalOpen: boolean;
  hideModal: (ev?: any) => any;
}

export interface ILookupModalState {
  selection?: IListItem;
}

const itemAlignmentsStackTokens: IStackTokens = {
  childrenGap: 20,
  padding: 10
};

const stackItemStyles: IStackItemStyles = {
  root: {
    padding: 5
  }
};

export class LookupModal extends React.Component<
  ILookupModalProps,
  ILookupModalState
> {
  onSelected(item: IListItem) {
    this.setState({ selection: item });
  }

  render() {
    const { columns, records } = this.props;

    return (
      <div>
        <Modal
          isOpen={this.props.isModalOpen}
          onDismiss={this.props.hideModal}
          isBlocking={false}
          containerClassName={contentStyles.container}
        >
          <div className={contentStyles.header}>
            <span>Multiple results returned, please select one.</span>
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={this.props.hideModal}
            />
          </div>
          <div className={contentStyles.body}>
            <Stack tokens={itemAlignmentsStackTokens}>
              <Stack.Item align="auto" styles={stackItemStyles}>
                <DetailsListSimple
                  records={records}
                  columns={columns}
                  onSelected={this.onSelected.bind(this)}
                />
              </Stack.Item>
              <Stack.Item align="end" styles={stackItemStyles}>
                <PrimaryButton text="Submit" />
              </Stack.Item>
            </Stack>
          </div>
        </Modal>
      </div>
    );
  }
}
