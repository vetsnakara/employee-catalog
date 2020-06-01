import React, { FC, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from './store/root/reducer'
import { getData } from './store/root/actions'

import { Container, Row, Column } from './layout'

import { Title } from './components/Title'
import { Toolbar } from './components/Toolbar'
import { List } from './components/List'
import { Form } from './components/Form'
import { Modal } from './components/Modal'
import { Error } from './components/Error'

import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import './App.css'

const App: FC<Props> = ({ getData }) => {
  useEffect(() => {
    getData()
  }, [getData])

  return (
    <React.Fragment>
      <Error />
      <Container className="app">
        <Row className="app__title">
          <Column>
            <Title size={2}>Employees Catalog</Title>
          </Column>
        </Row>
        <Row className="app__toolbar">
          <Column>
            <Toolbar />
          </Column>
        </Row>
        <Row>
          <Column size="5">
            <List />
          </Column>
          <Column size="7">
            <Form />
          </Column>
        </Row>
      </Container>
      <Modal />
    </React.Fragment>
  )
}

const mapDispatch = (dispatch: ThunkDispatch<RootState, null, Action>) => ({
  getData: () => dispatch(getData())
})

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ConnectedApp = connector(App)

export { ConnectedApp as App }
