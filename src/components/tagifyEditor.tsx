import { useCallback, useState } from 'react';
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import { MixedTags } from "@yaireo/tagify/dist/react.tagify"
import { ChangeEventData, TagData } from '@yaireo/tagify';
//import {MixedTags} from "./tagify/react.tagify"

// Tagify settings object
const settings = {
    // pattern: /@/,  // <- must define "patten" in mixed mode
    // dropdown: {
    //   enabled: 1,
    //   position: "text"
    // },
  whitelist: [
    {id: 100, value: "kenny", title: "Kenny McCormick"},
    {id: 101, value: "cartman", title: "Eric Cartman"},
    {id: 102, value: "kyle", title: "Kyle Broflovski"},
    {id: 103, value: "token", title: "Token Black"},
    {id: 104, value: "jimmy", title: "Jimmy Valmer"},
    {id: 105, value: "butters", title: "Butters Stotch"},
    {id: 106, value: "stan", title: "Stan Marsh"},
    {id: 107, value: "randy", title: "Randy Marsh"},
    {id: 108, value: "Mr. Garrison", title: "POTUS"},
    {id: 109, value: "Mr. Mackey", title: "M'Kay"}
  ]
}
const Tagify = () => {
    const [isReadonly, setIsReadonly] = useState(false)

    const onChange = useCallback((e: CustomEvent<ChangeEventData<{ id: number; value: string; title: string; }>> )=> {
      console.log("CHANGED:", e.detail.value)
    }, [])
  
    return (
      <>
        <br />
        <br />
        <MixedTags
          autoFocus={true}
          className="myTags"
          readOnly={isReadonly}
            settings={settings}
          onChange={onChange}
          value={`
  This is a textarea which mixes text with [[{"value":"tags"}]].
  To add a [[{"value":"tag"}]], type <em>@</em> and a (Latin) character. Here's a [[{"value":"readonly", "readonly":true}]] tag.
  <br>
  <small>(Only tags from the <em>whitelist</em> are allowed. <em>Whitelist</em> contains names of Southpark characters.)</small
  <br>
  <small>(Open this demo in a full-window to be able to type new-line returns)</small>
          `}
        />
      </>
    )
  }

export default Tagify;