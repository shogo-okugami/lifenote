import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import NoteCard from '../NoteCard/NoteCard'
import useNoteList from './useNoteList'

const NoteList = ({ notes }) => {

    const { loadMore, loader, hasMore, items, index, dateRef } = useNoteList(notes)

    return (
        <>
            {
                notes.map((note, i) => <NoteCard key={i} note={note} index={i} monthlyHeading={dateRef} />)
            }
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
