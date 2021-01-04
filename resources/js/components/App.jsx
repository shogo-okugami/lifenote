import React, { useState, useEffect, createContext, useContext } from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import NoteList from './NoteList'
import Calendar from './Calendar'

const settings = {
  user_id: 1,
  color_mode: 2,
  font_style: 0,
  dark_flg: 1,
}

const colors = ['normal', 'red', 'blue', 'yellow', 'green', 'pink']

const colorMode = colors[settings.color_mode]

const settingContext = createContext()

const setColorMode = (color) => {

  switch (color) {
    case 'red':
      return 'is-red'
      break;
    default:
      return ''
      break;
  }

}

const App = (props) => {

  const [color, setColor] = useState(colorMode)

  const [isDark, setIsDark] = useState(Boolean(settings.dark_flg))

  console.log('color is ' + color + ' dark is ' + isDark)

  const content = () => {

    switch (props.content) {

      case 'note':
        return <NoteList userId={props.userId} />
        break;
      case 'calendar':
        return <Calendar />
        break
      case 'diary':
        return <Diary />
        break
      default:
        return <NoteList userId={props.userId} />
        break
    }

  }

  return (
    <>
      <settingContext.Provider value={{ colorMode: { color: color, setColor: setColor }, darkMode: { dark: isDark, setIsDark: setIsDark } }}>
        <header id="header" className={'l-header ' + (isDark ? 'is-dark ' : '') + setColorMode(color)}>
          <div className="l-header__inner">
            <h1 className="c-heading--large">lifenote</h1>
            <div>
              { props.isLogin && <div>login</div>}
            </div>
          </div>
        </header>

        <main id="main" className="l-wrapper">
          <Nav />
          <div className="l-wrapper__inner">
            {content()}
          </div>
        </main>
      </settingContext.Provider>
    </>
  )
}

const Element = document.getElementById('app');
if (Element) {
  const userId = Element.getAttribute('userId')
  const parsedUserId = JSON.parse(userId)
  const isLogin = Element.getAttribute('isLogin')
  const parsedIsLogin = JSON.parse(isLogin)
  const content = Element.getAttribute('content')
  const parsedContent = JSON.parse(content)
  ReactDOM.render(<App userId={parsedUserId} isLogin={parsedIsLogin} content={parsedContent} />, Element);
}

export { settingContext }
