import React, { useState, useRef, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import ReactLoading from 'react-loading'
import NoteCard from './NoteCard'

const NoteList = ({ userId, isDark, mediaScreenL }) => {

    const [index, setIndex] = useState({
        notes: [],
        page: 0,
    })

    const [hasMore, setHasMore] = useState(true)

    const loadMore = async () => {

        if (hasMore) {
            try {
                const res = await fetch(`api/home?user_id=${userId}&page=${index.page}`)
                const resp = await res.json()
                if (resp.length > 0) {
                    setIndex({
                        notes: [...index.notes, ...resp],
                        page: index.page + 20,
                    })
                } else {
                    setHasMore(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    //SP画面で一番下のノートカードがナビゲーションに隠れないようにする
    useEffect(() => {
        //ユーザーが投稿したノートをすべて取得した場合
        if (!hasMore) {
            if (!mediaScreenL) {
                //ヘッダー要素とヘッダーの高さを取得
                const header = document.getElementById('header')
                const headerHeight = header.offsetHeight
                document.body.style.height = 'auto' //heightをauto
                //body要素のpadding-bottomにナビゲーションの高さを指定する
                document.body.style.paddingBottom = document.getElementById('nav').offsetHeight + 'px'
                header.style.height = headerHeight + 'px' //現在のヘッダーの高さをピクセルで指定する
                document.querySelector('.c-card:last-child').style.border = 'none'//一番下のカードのボーダーを消す
            } else {
                document.querySelector('.c-card:last-child').style.border = ''
            }
        }
    }, [hasMore, mediaScreenL])

    const loader = <ReactLoading key={0} type={'spokes'} className='u-display--center' color={'#444'} delay={5000} />

    const dateRef = useRef(null)

    const items = index.notes.map((note, i) => <NoteCard key={i} userId={userId} note={note} index={i} monthlyHeading={dateRef} isDark={isDark} />)

    return (
        <>
            <InfiniteScroll
                pageStart={index.page}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={loader}>
                {items}
            </InfiniteScroll>
        </>
    )
}

export default NoteList
