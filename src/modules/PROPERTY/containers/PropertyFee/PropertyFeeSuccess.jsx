// 收费管理 - 审核成功
import React, {Component} from 'react'
import {Table, Spin } from 'antd'
import { apiPost } from '../../../../api'
import PropertyFeeHeadComponent from '../../components/PropertyFee/PropertyFeeHead'
import AllPaidComponent from '../details/PropertyFee/PropertyDetail'
// 引入组件
// React component
class PropertyFeeSuccess extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            id: null,
            dataSource: [],
            ListBuildingInfo: []
        }
    }
    handleUpdate = (id) => {
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: true,
            id: id
        })
    }
    close = async () => {
        this.setState({
            openAdd: false,
            opendispatch: false,
            openTableAddUp: false,
            openUpdate: false,
            id: null
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        let result = await apiPost(
            '/propertyFee/propertyFeeList',
            {auditStatus: 2}
        )
        const handleUpdate = this.handleUpdate
        this.setState({loading: false,
            ListBuildingInfo: ListBuildingInfo.data,
            columns: [{
                title: '序号',
                width: 100,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '所属楼宇',
                width: 150,
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '房间编号',
                width: 250,
                dataIndex: 'roomNum',
                key: 'roomNum'
            }, {
                title: '客户名称',
                width: 320,
                dataIndex: 'clientName',
                key: 'clientName'
            }, {
                title: '本期物业费周期',
                width: 280,
                dataIndex: 'periodPropertyFee',
                key: 'periodPropertyFee'
            }, {
                title: '应收金额',
                width: 150,
                dataIndex: 'actualPaidMoney',
                key: 'actualPaidMoney'
            }, {
                title: '交费期限',
                width: 150,
                dataIndex: 'payDeadline',
                key: 'payDeadline'
            }, {
                title: '实收物业费日期',
                width: 150,
                dataIndex: 'receiptDate',
                key: 'receiptDate'
            }, {
                title: '逾期天数',
                width: 150,
                dataIndex: 'overdueDay',
                key: 'overdueDay'
            }, {
                title: '延期下个月电费',
                width: 150,
                dataIndex: 'lateConductWay',
                key: 'lateConductWay',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.lateConductWay === 0) {
                        whType = '否'
                    }
                    if (record.lateConductWay === 1) {
                        whType = '是'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '物业费开票状态',
                width: 150,
                dataIndex: 'invoicePropertyStatus',
                key: 'invoicePropertyStatus',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.invoicePropertyStatus === 0) {
                        whType = '未开票'
                    }
                    if (record.invoicePropertyStatus === 1) {
                        whType = '已开票'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '打印状态',
                width: 150,
                dataIndex: 'whetherPrinted',
                key: 'whetherPrinted',
                render: function (text, record, index) {
                    let whetherPrinted = ''
                    if (record.whetherPrinted === 0) {
                        whetherPrinted = '未打印'
                    }
                    if (record.whetherPrinted === 1) {
                        whetherPrinted = '已打印'
                    }
                    return (
                        <span>{whetherPrinted}</span>
                    )
                }
            }, {
                title: '操作',
                width: 100,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <div>
                            <a onClick={() => handleUpdate(record.id)} > 明细 </a>
                        </div>
                    )
                }
            }],
            dataSource: result.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async (pagination, filters, sorter) => {
        filters['auditStatus'] = 2
        // 刷新表格
        let result = await apiPost(
            '/propertyFee/propertyFeeList',
            filters
        )
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data
        })
    }
    clientName = null
    entryNameOnChange = (e) => {
        this.clientName = e.target.value
    }
    roomNum = ''
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    periodStatus = ''
    selectOnChange = (e) => {
        this.periodStatus = e
    }
    query = () => {
        this.refresh()
    }
    render () {
        return (
            <div>
                <PropertyFeeHeadComponent
                    refresh={this.refresh}
                    ListBuildingInfo={this.state.ListBuildingInfo}
                />
                <AllPaidComponent
                    close={this.close}
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 2000 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default PropertyFeeSuccess


