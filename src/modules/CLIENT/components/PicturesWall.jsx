import { Upload, Icon, Modal } from 'antd'
import React from 'react'
import { baseURL } from '../../../api/index'
class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: []
    };

    handleCancel = () => {
        this.setState({ previewVisible: false })
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.view.toString() === 'update') {
            this.setState({
                fileList: nextProps.fileList
            })
            this.props.updateView()
        } else if (nextProps.view.toString() === 'insert') {
            this.setState({
                fileList: []
            })
            this.props.updateView()
        }
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }

    handleChange = ({ fileList }) => {
        let imgUrl = ''
        fileList.map(file => {
            if (typeof (file.response) !== 'undefined') {
                imgUrl = imgUrl + file.response.data + '#'
            } else {
                imgUrl = imgUrl + file.name + '#'
            }
            return ''
        })
        this.props.callback(imgUrl)
        this.setState({ fileList })
    }
    render () {
        const { previewVisible, previewImage, fileList } = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <div className="clearfix">
                <Upload
                    action={baseURL + 'storage/uploader'}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <Modal maskClosable={false} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

export default PicturesWall
