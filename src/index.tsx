import { LookupModal } from "./Controls/LookupModal";
import ReactDOM from "react-dom";
import React from "react";
import * as faker from "faker";
import { IListItem } from "./Controls/DetailsListSimple";
import { PrimaryButton } from "@fluentui/react";

// Populate with items for demos.

interface IAppState {
  isModalOpen: boolean;
}

class App extends React.Component<{}, IAppState> {
  private _allItems: IListItem[] = [];
  private _columns = [
    {
      key: "column1",
      name: "First Name",
      fieldName: "firstName",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true
    },
    {
      key: "column2",
      name: "Last Name",
      fieldName: "lastName",
      minWidth: 50,
      maxWidth: 100,
      isResizable: false
    },
    {
      key: "column3",
      name: "Index",
      fieldName: "index",
      minWidth: 50,
      maxWidth: 100,
      isResizable: false
    }
  ];
  constructor(props: any) {
    super(props);

    for (let i = 0; i < 15; i++) {
      this._allItems.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        index: faker.random.alphaNumeric(3)
      });
    }
    this.state = {
      isModalOpen: false
    };
  }

  private hideModal(e: any) {
    debugger;
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  private onSelected(selection: any) {
    console.log(selection);
  }

  render() {
    return (
      <React.Fragment>
        <PrimaryButton
          onClick={() => {
            this.setState({ isModalOpen: true });
          }}
          text="Open list modal"
        />
        <LookupModal
          records={this._allItems}
          columns={this._columns}
          onSelected={this.onSelected.bind(this)}
          isModalOpen={this.state.isModalOpen}
          hideModal={this.hideModal.bind(this)}
        />
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(React.createElement(App), rootElement);
