// 路由根组件
import React from 'react'
import { Route } from 'react-router-dom'
import {
    // Home,
    // Count,
    // View,
    TestRoute,
    AuthView,
    PrivateRoute,
    Login,
    Protected
} from '../common/containers'

import Link from 'react-router-redux-dom-link'

class Routes extends React.Component {
    render () {
        const { isAuthenticate } = this.props

        return (
            <Route>
                <div>
                    {/* 导航 部分 */}
                    <ul>
                        <li><Link to="/" replace> 首页 </Link></li>
                        <li><Link to="/count" replace> 计算器 </Link></li>
                        <li><Link to="/view" replace> 共享计算值 </Link></li>
                        <li><Link to="/testRoute" replace> 测试路由页面 </Link></li>
                        <li><Link to="/protected" replace> 验证登录页 </Link></li>
                    </ul>

                    <hr />

                    {/* 内容 展示 */}
                    {/*
                        <Route exact path="/" component={ Home } />
                        <Route path="/count" component={ Count } />
                        <Route path="/view" component={ View } />
                        <Route path="/testRoute" component={ TestRoute } />
                    */}

                    <PrivateRoute
                        isAuthenticate={ isAuthenticate }
                        path="/protected "
                        component={ Protected }
                    />
                    <Route path="/login" component={ Login } />
                    <Route path="/testRoute" component={ TestRoute } />
                    <hr />

                    {/* 登录状态 展示 */}
                    <AuthView isAuthenticate={ isAuthenticate } />
                </div>
            </Route>
        )
    }
}


export default Routes
