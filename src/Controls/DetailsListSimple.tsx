import * as React from "react";
import {
  DetailsList,
  Selection,
  IColumn,
  MarqueeSelection,
  DetailsListLayoutMode,
  TextField,
  SelectionMode,
  IDetailsList
} from "@fluentui/react";
import { listStyles, textFieldStyles } from "./styles/DetailsListSimple-styles";
import { createRef } from "react";

export interface IDetailsListSimpleProps<T = any> {
  columns: IColumn[];
  records: T[];
  onSelected?(selection: T): void;
}

export interface IListItem<T = any> {
  index: T;
  [x: string]: T;
}

export interface IDetailsListSimpleState {
  items: IListItem[];
  selectionDetails: IListItem;
  needshorizontalScrollBar: boolean;
}

export class DetailsListSimple extends React.Component<
  IDetailsListSimpleProps,
  IDetailsListSimpleState
> {
  private _selection: Selection;
  private _allItems: IListItem[];
  private _columns: IColumn[];
  private _root;

  constructor(props: IDetailsListSimpleProps) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => {
        let details = this._getSelectionDetails();
        this.setState({ selectionDetails: details });
        if (this.props.onSelected) this.props.onSelected(details);
      }
    });

    this._allItems = props.records;

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails(),
      needshorizontalScrollBar: false
    };
    debugger;
    this._root = createRef<IDetailsList>();
    this._getHorizontalScrollBar = this._getHorizontalScrollBar.bind(this);
  }

  componentDidMount() {
    if (!this._root.current) {
      return;
    }
    window.dispatchEvent(new Event("resize"));
    window.addEventListener("resize", this._getHorizontalScrollBar);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._getHorizontalScrollBar);
  }

  private _onChangeText = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ): void => {
    debugger;
    let filteredSet = this._allItems.filter(
      (i) =>
        JSON.stringify(i)
          .toLowerCase()
          .indexOf((text as string).toLowerCase()) > -1
    );
    this.setState({
      items: text ? filteredSet : this._allItems
    });
  };

  // need to check container vs contents not modal vs list... needs updated when less sleepy
  private _getHorizontalScrollBar(): void {
    let needsHorizontalScrollBar = false;
    debugger;
    let actualRoot = (this._root.current as any)._root;
    let parentElement = actualRoot.current.parentElement as HTMLDivElement;
    if (
      actualRoot &&
      actualRoot.current &&
      actualRoot.current.firstElementChild
    ) {
      const parentWidth = parentElement.clientWidth;
      const rootWidth = actualRoot.current.firstElementChild.clientWidth;
      if (parentWidth > 0 && parentWidth > rootWidth) {
        needsHorizontalScrollBar = parentWidth - rootWidth > 1;
      }
    }
    if (this.state.needshorizontalScrollBar !== needsHorizontalScrollBar) {
      this.setState({
        needshorizontalScrollBar: needsHorizontalScrollBar
      });
    }
  }

  render() {
    const { items } = this.state;
    return (
      <React.Fragment>
        <TextField
          label="Filter:"
          onChange={this._onChangeText}
          styles={textFieldStyles}
        />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            componentRef={this._root}
            items={items}
            columns={this.props.columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            selectionMode={SelectionMode.single}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            onItemInvoked={(item) => this._onItemInvoked(item)}
            className={[listStyles.body, listStyles.container].join(" ")}
            styles={
              this.state.needshorizontalScrollBar
                ? {}
                : { root: { overflowX: "hidden" } }
            }
          />
        </MarqueeSelection>
      </React.Fragment>
    );
  }

  private _getSelectionDetails(): IListItem {
    return this._selection.getSelection()[0] as IListItem;
  }

  private async _onItemInvoked(item: IListItem) {
    alert(`${item.index} selected`);
  }
}
