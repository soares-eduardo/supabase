import { Input } from '@supabase/ui'
import React, { useState, useRef } from 'react'

const AutoTextArea = (props) => {

  // useEffect(() => {
  //   setParentHeight(`${textAreaRef?.current.scrollHeight}px`)
  //   setTextAreaHeight(`${textAreaRef?.current.scrollHeight}px`)
  // }, [text])

  // const onChangeHandler = (event) => {
  //   setTextAreaHeight('auto')
  //   setParentHeight(`${textAreaRef?.current.scrollHeight}px`)
  //   setText(event.target.value)

  //   if (props.onChange) {
  //     props.onChange(event)
  //   }
  // }

  return (
    <div
      style={{
        minHeight: parentHeight,
      }}
    >
      <Input.TextArea
        {...props}
        label={props.label}
        size="small"
        // ref={textAreaRef}
        rows={1}
        style={{
          height: textAreaHeight,
          overflow: 'hidden',
          resize: 'none',
        }}
        // onChange={onChangeHandler}
      />
    </div>
  )
}

export default AutoTextArea
