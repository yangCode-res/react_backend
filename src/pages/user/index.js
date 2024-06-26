import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker } from 'antd'
import "./user.css"
import { getUser, addUser, editUser ,delUser} from "../../api"
import dayjs from "dayjs";
const User = () => {
    const [listData, setListData] = useState({
        name: ""
    })
    const [tableData, setTableData] = useState([])
    const [modalType, setModalType] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm();
    const handleClick = (type, rowData) => {
        setIsModalOpen(!isModalOpen)
        if (type == 'add') {
            setModalType(0)
        } else {
            setModalType(1)
            const cloneData = JSON.parse(JSON.stringify(rowData))
            console.log(cloneData);
            cloneData.birth = dayjs(cloneData.birth)
            form.setFieldsValue(cloneData)
        }

    }
    const handleDelete = ({id}) => {
            delUser({id}).then((res)=>{
                getTableData()
            })
    }
    const handleOk = () => {
        //表单校验
        form.validateFields().then((val) => {
            console.log(val);
            val.birth = dayjs(val.birth).format("YYYY-MM-DD")
            if (modalType) {
                editUser(val).then(()=>{
                    handleCancle()
                    getTableData()
                })
            } else {
                addUser(val).then((res) => {
                    handleCancle()
                    getTableData()
                })
            }
        }).catch((err)=>{
                console.log(err);
        })

    }
    const handleCancle = () => {
        setIsModalOpen(false)
        form.resetFields()
    }
    const handleFinsh = (e) => {
        setListData({
            name: e.keyword
        })
        getTableData()
        console.log(e)
    }
    const getTableData = () => {
        getUser(listData).then(({ data }) => {
            console.log(data, 'res');
            setTableData(data.list)
        })
    }
    useEffect(()=>{
        getTableData()
    },[listData])
    const columns = [
        {
            title: "姓名",
            dataIndex: 'name',
        },
        {
            title: "年龄",
            dataIndex: 'age',
        },
        {
            title: "性别",
            dataIndex: 'sex',
            render: (val) => {
                return val ? '女' : '男'
            }
        },
        {
            title: "出生日期",
            dataIndex: 'birth',
        },
        {
            title: "地址",
            dataIndex: 'addr',
        },
        {
            title: "操作",
            render: (rowData) => {
                return (
                    <div className="flex-box ">
                        <Button type="primary" style={{ marginRight: "5px" }} onClick={() => handleClick('edit', rowData)}>编辑</Button>
                        <Popconfirm
                            title="确定删除吗？"
                            description="删除后无法恢复"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => { handleDelete(rowData) }}>
                            <Button type="primary" danger  >删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ]
    useEffect(() => {
        //调用后端借口
        getTableData()
    }, [])
    return (
        <div className="user">
            <div className="flex-box space-between">
                <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
                <Form layout="inline"
                    onFinish={handleFinsh}>
                    <Form.Item name="keyword">
                        <Input placeholder="请输入用户名"></Input>
                    </Form.Item>
                    <Form.Item >
                        <Button htmlType="submit" type="primary">搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table style={{marginTop:'10px'}} columns={columns} dataSource={tableData} rowKey={'id'}></Table>
            <Modal title={modalType ? '编辑用户' : '新增用户'} open={isModalOpen} onCancel={handleCancle} onOk={handleOk} okText="确定" cancelText="取消">
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} labelAlign="left" form={form}>
                    {modalType == 1 && <Form.Item name='id' hidden >
                        <Input></Input>
                    </Form.Item>}

                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[{
                            required: true,
                            message: "请输入姓名"
                        }]}>
                        <Input placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item
                        label="年龄"
                        name="age"
                        rules={[{
                            required: true,
                            message: "请输入年龄"
                        },
                        {
                            type: "number",
                            message: "年龄必须是数字"
                        }]}>
                        <InputNumber placeholder="请输入年龄" />
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="sex"
                        rules={[{
                            required: true,
                            message: "请选择性别"
                        }]}>
                        <Select options={[{
                            value: 0,
                            label: "男"
                        },
                        {
                            value: 1,
                            label: "女"
                        }]}>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="出生日期"
                        name="birth"
                        rules={[{
                            required: true,
                            message: "请选择出生日期"
                        }]}>
                        <DatePicker placeholder="请选择日期" format="YYYY/MM/DD"></DatePicker>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="addr"
                        rules={[{
                            required: true,
                            message: "请输入地址"
                        }]}>
                        <Input placeholder="请输入地址" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default User