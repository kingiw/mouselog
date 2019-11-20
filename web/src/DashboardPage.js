import React from "react";
import * as Setting from "./Setting";
import {Table, Divider, Tag, Row, Col} from 'antd';
import {Layer, Line, Stage} from "react-konva";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      sessions: [],
      fileId : "",
      traces: [],
      trace: null,
    };
  }

  componentDidMount() {
    fetch(`${Setting.ServerUrl}/api/list-sessions`, {
      method: "GET",
      credentials: "include"
    }).then(res => res.json())
        .then(res => {
          this.setState({
            sessions: res
          });
        });
  }

  renderSessionTable() {
    const columns = [
      {
        title: 'File ID',
        dataIndex: 'sessionId',
        key: 'sessionId',
      },
      {
        title: 'Trace Size',
        dataIndex: 'traceSize',
        key: 'traceSize',
      },
      {
        title: 'Is Bot',
        dataIndex: 'isBot',
        key: 'isBot',
      },
      {
        title: 'Rule',
        dataIndex: 'rule',
        key: 'rule',
      },
      {
        title: 'Rule Start',
        dataIndex: 'ruleStart',
        key: 'ruleStart',
      },
      {
        title: 'Rule End',
        dataIndex: 'ruleEnd',
        key: 'ruleEnd',
      }
    ];

    const rowRadioSelection = {
      type: 'radio',
      columnTitle: 'Select',
      onSelect: (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys, selectedRows);

        fetch(`${Setting.ServerUrl}/api/list-traces?fileId=${selectedRowKeys.sessionId}&perPage=${10000000}&page=${0}`, {
          method: "GET",
          credentials: "include"
        }).then(res => res.json())
            .then(res => {
              this.setState({
                traces: res.traces,
                fileId: selectedRowKeys.sessionId
              });
            });
      },
    };

    return (
        <div>
          <Table rowSelection={rowRadioSelection} columns={columns} dataSource={this.state.sessions} size="small" bordered title={() => 'Sessions'} />
        </div>
    );
  }

  renderTraceTable() {
    const columns = [
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: 'Width',
        dataIndex: 'width',
        key: 'width',
      },
      {
        title: 'Height',
        dataIndex: 'height',
        key: 'height',
      },
      {
        title: 'Event Count',
        dataIndex: 'events.length',
        key: 'count',
      }
    ];

    const rowRadioSelection = {
      type: 'radio',
      columnTitle: 'Select',
      onSelect: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);

        this.setState({
          trace: selectedRowKeys,
        });
      },
    };

    return (
      <div>
        <Table rowSelection={rowRadioSelection} columns={columns} dataSource={this.state.traces} size="small" bordered title={() => 'Traces: ' + this.state.fileId} />
      </div>
    );
  }

  getPoints(canvasWidth, canvasHeight) {
    if (this.state.trace !== null) {
      return this.getPointsFromTrace(this.state.trace, canvasWidth, canvasHeight);
    } else {
      return [];
    }
  }

  getPointsFromTrace(trace, canvasWidth, canvasHeight) {
    let points = [];
    trace.events.forEach(function (event) {
      points.push(event.x * canvasWidth / trace.width);
      points.push(event.y * canvasHeight / trace.height);
    });
    return points;
  }

  renderCanvas() {
    const width = document.body.scrollWidth / 2 - 20;
    const height = document.body.scrollHeight / 2 - 20;
    return (
      <Stage width={width} height={height} style={{border: '1px solid rgb(232,232,232)', marginLeft: '5px'}}>
        <Layer>
          <Line
            x={-10}
            y={-10}
            points={this.getPoints(width, height)}
            stroke="black"
            scaleX={1}
            scaleY={1}
          />
          {/*{*/}
          {/*  (this.state.ruleStart !== -1 && this.state.ruleEnd !== -1) ? <Line*/}
          {/*      x={0}*/}
          {/*      y={0}*/}
          {/*      points={this.getPoints().slice(this.state.ruleStart * 2, this.state.ruleEnd * 2)}*/}
          {/*      stroke="red"*/}
          {/*      strokeWidth={5}*/}
          {/*      scaleX={0.5}*/}
          {/*      scaleY={0.5}*/}
          {/*    />*/}
          {/*    : null*/}
          {/*}*/}
        </Layer>
      </Stage>
    )
  }

  render() {
    return (
        <div>
          <Row>
            <Col span={12}>
              {
                this.renderSessionTable()
              }
              {
                this.renderTraceTable()
              }
            </Col>
            <Col span={12}>
              {this.renderCanvas()}
            </Col>
          </Row>

        </div>
    );
  }

}

export default DashboardPage;