import _ from "lodash";

/**
 * Abstracts the provided data into a format that is approachable as if
 * it were a conventional relational database table.
 * Takes JSON data formatted as a column arrays. (http://www.convertcsv.com/csv-to-json.htm)
 */
export default class JsonColumnQuery {
  constructor(table, idName) {
    // TODO: verify table is in column array format
    this.table = table;
    this.columnNames = Object.keys(this.table);
    this.idColumnName = idName + "s"; // Removes the 'ids' from the list
    this.foreignKeys = this.table[this.idColumnName];
  }

  getIdColumnName() {
    return this.idColumnName;
  }

  /**
   * Returns the attribute data associated with the given foreign key.
   */
  getRow(foreignKey) {
    // get all data associated with single feature
    let keyIndex = this.foreignKeys.indexOf(foreignKey);
    if (keyIndex === -1) {
      console.error(`Requested key '${foreignKey}' does not exist in data.`);
      return;
    }

    let row = {};
    this.columnNames.forEach(columnName => {
      row[columnName] = this.table[columnName].data[keyIndex];
    });

    return row;
  }

  getIds() {
    return this.foreignKeys;
  }

  getColumnSummary(columnName, classBreakName = "quantile") {
    if (!this._verifyColumn(columnName)) return undefined;

    return {
      data: this._getColumnData(columnName),
      stats: this._getColumnStats(columnName),
      classBreaks: this._getColumnClassBreaks(columnName, classBreakName)
    };
  }

  getColumnData(columnName) {
    if (!this._verifyColumn(columnName)) return undefined;

    return this._getColumnData(columnName);
  }

  getColumnStats(columnName) {
    if (!this._verifyColumn(columnName)) return undefined;

    return this._getColumnStats(columnName);
  }

  getColumnClassBreaks(columnName, classBreakName) {
    if (!this._verifyColumn(columnName)) return undefined;

    let column = this.table[columnName];

    if (
      !column.hasOwnProperty("classBreaks") ||
      (column.hasOwnProperty("classBreaks") &&
        (!_.isNil(column.classBreaks) ||
          Object.keys(column.classBreaks).length === 0))
    ) {
      console.error(
        `The provided column ${columnName} does not have any provided class breaks.'`
      );
      return;
    } else if (Object.keys(column.classBreaks).indexOf(classBreakName) === -1) {
      console.error(
        `The provided class break '${classBreakName} does not exist for the given column '${columnName}'`
      );
      return;
    }

    return this._getColumnClassBreaks(columnName);
  }

  _verifyColumn(columnName) {
    let columnIndex = this.columnNames.indexOf(columnName);
    if (columnIndex === -1) {
      console.error(`Requested column '${columnName}' does not exist in data.`);
      return false;
    }

    return true;
  }

  _getColumnData(columnName) {
    return this.table[columnName].data;
  }

  _getColumnStats(columnName) {
    return this.table[columnName].stats;
  }

  _getColumnClassBreaks(columnName, classBreakName) {
    return this.table[columnName].classBreaks[classBreakName];
  }
}
