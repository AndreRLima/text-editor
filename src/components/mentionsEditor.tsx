import { useCallback, useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions'
const users = [
    {
        id: "{isaac}",
        display: "{Isaac Newton}",
    },
    {
        id: "sam",
        display: "Sam Victor",
    },
    {
        id: "emma",
        display: "emmanuel@nobody.com",
    },
];

const MentionEditor = () => {
    const [value, setValue] = useState('');
    const re = new RegExp("/\{[^{}]+\}/");
    const emailRegex = /\{[{}]+\}/;
    return (
        <MentionsInput value={value} onChange={(e) => setValue(e.target.value)}>

            <Mention
                trigger={emailRegex}
                data={users}
                style={{ backgroundColor: "#d1c4e9" }}
            />
        </MentionsInput>
    );
};

export default MentionEditor;