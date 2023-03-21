import { FC, useEffect, useState } from 'react';
import { cx } from 'remirror';
import {
    LinkExtension, MentionExtension, PlaceholderExtension, MentionExtensionAttributes, BoldExtension,
    HeadingExtension,
    ItalicExtension,
    UnderlineExtension
} from 'remirror/extensions';
import {
    EditorComponent, FloatingWrapper, Remirror, ThemeProvider, useMention, useRemirror, BasicFormattingButtonGroup,
    HeadingLevelButtonGroup,
    HistoryButtonGroup,
    Toolbar
} from '@remirror/react';
import { AllStyledComponent } from '@remirror/styles/emotion';

const ALL_USERS = [
    { id: 'joe', label: '-'},
    { id: 'sue', label: 'Sue' },
    { id: 'pat', label: '{Pat' },
    { id: 'tom', label: '{Tom' },
    { id: 'jim', label: '{Jim' },
];

const UserSuggester = () => {
    const [users, setUsers] = useState<MentionExtensionAttributes[]>([]);
    const { state, getMenuProps, getItemProps, indexIsHovered, indexIsSelected } = useMention({
        items: users,
    });

    useEffect(() => {
        if (!state) {
            return;
        }

        const searchTerm = state.query.full.toLowerCase();
        // const filteredUsers = ALL_USERS.filter((user) => user.label.toLowerCase().includes(searchTerm))
        //     .sort()
        //     .slice(0, 5);
        setUsers(ALL_USERS);
    }, [state]);

    const enabled = !!state;

    return (
        <FloatingWrapper positioner="cursor" enabled={enabled} placement="bottom-start">
            <div {...getMenuProps()} className="suggestions">
                {enabled &&
                    users.map((user, index) => {
                        const isHighlighted = indexIsSelected(index);
                        const isHovered = indexIsHovered(index);

                        return (
                            <div
                                key={user.id}
                                className={cx('suggestion', isHighlighted && 'highlighted', isHovered && 'hovered')}
                                {...getItemProps({
                                    item: { ...user },
                                    index,
                                })}
                            >
                                {user.label}
                            </div>
                        );
                    })}
            </div>
        </FloatingWrapper>
    );
};

const extensions = () => [
    new LinkExtension({ autoLink: true }),
    new HeadingExtension(),
    new BoldExtension({}),
    new ItalicExtension(),
    new UnderlineExtension(),
    new MentionExtension({
        appendText: ' ',
        matchers: [
            { name: 'brackets', char: /\{[{}]+\}/ },
            { name: 'tag', char: '#' },
        ],
        extraAttributes: {
            role: { default: 'presentation' },
            href: { default: null },
        },
    }),
    new PlaceholderExtension({
        placeholder: 'Enter text here',
    }),
];

export interface EditorProps { }

const Editor: FC = () => {
    const { manager } = useRemirror({ extensions });

    return (
        <AllStyledComponent>
            <ThemeProvider>
                <Remirror manager={manager} >
                    <Toolbar>
                        <HistoryButtonGroup />
                        <BasicFormattingButtonGroup />
                        <HeadingLevelButtonGroup showAll />
                    </Toolbar>
                    <EditorComponent />
                    <UserSuggester />
                </Remirror>
            </ThemeProvider>
        </AllStyledComponent>
    );
};

export default Editor;
