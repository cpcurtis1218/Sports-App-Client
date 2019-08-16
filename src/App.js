import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Sidebar from './sidebar/Sidebar.js'

import AddGroup from './group-components/AddGroup.js'
import Groups from './group-components/Groups.js'
import Group from './group-components/Group.js'
import EditGroup from './group-components/EditGroup.js'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <section>
          <Route path='/' render={() => (
            <Sidebar/>
          )} />
        </section>
        <main className="">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <Route exact path='/groups' render={() => (
            <Groups/>
          )} />
          <Route exact path='/groups/:id' render={() => (
            <Group/>
          )} />
          <Route exact path='/add-group' render={() => (
            <AddGroup/>
          )} />
          <Route exact path='/groups/:id/edit' render={() => (
            <EditGroup/>
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
