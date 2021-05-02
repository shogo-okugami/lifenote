
import React, { useEffect } from 'react';
import weeks from '../weeks'
import { nl2br } from '../functions'

const NoteCard = ({ note: noteItem, isDark, mediaScreenL, index, monthlyHeading }) => {

    const note = noteItem

    const getNoteDate = (date) => {
        let str = date.split('/')
        date = str.map(value => parseInt(value))
        date = new Date(date[0], date[1] - 1, date[2])
        const result = {}
        result.day = date.getDate()
        result.month = date.getMonth() + 1
        result.year = date.getFullYear()
        result.ofWeek = weeks[date.getDay()]
        return result
    }

    const date = getNoteDate(note.date)

    const redirect = (noteId) => {

        window.location.href = `http://localhost:8888/lifenote/public/notes/${noteId}`

    }

    useEffect(() => {

        const card = document.getElementById('card-' + index)//カードのHTML要素を取得
        const date = card.getAttribute('date') //date属性を取得

        //カードの日付(Y/m)が異なる場合
        if (monthlyHeading.current !== date) {
            //div要素を生成
            let div = document.createElement('div')
            //テキストを新たな日付にする　
            div.textContent = date
            //カードの直前に要素を挿入
            card.before(div)
            //日付を更新
            monthlyHeading.current = date
        }
    }, [])

    return (
        <>
            { !mediaScreenL && <div>{date.year + '/' + date.month + '/' + date.day + ' ' + date.ofWeek}</div>}
            <div id={"card-" + index} key={note.id} date={note.date.slice(0, 7)} className={'c-card ' + (isDark ? 'is-dark' : '')} onClick={() => redirect(note.id)}>
                <div className="c-card__body">
                    <div className={'c-card__date ' + (isDark ? 'is-dark' : '') + (!mediaScreenL ? ' u-display--none' : '')}>
                        <div className="c-card__date__inner">{date.month}/{date.day} {date.ofWeek}<span className={isDark ? 'is-dark' : ''}>{date.year}</span></div>
                    </div>
                    <div className="c-card__text">
                        <div>
                            {nl2br(note.text)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteCard
