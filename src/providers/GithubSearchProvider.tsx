"use client"

import React, { createContext, useCallback, useContext, useReducer, Dispatch} from "react";

type User = {
    login: string;
    id: number,
    avatar_url: string;
    gravatar_id: '',
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: false;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string | null;
    hireable: true;
    bio: string;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

type GithubState = {
    user: User | null;
    loading: boolean;
    error: null | string;
}

type PayloadShape = User | string | null;

enum ActionType {
    SEARCH_USER = 'SEARCH_USER',
    SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS',
    SEARCH_USER_ERROR = 'SEARCH_USER_ERROR',
}

type Action = {
    type: ActionType;
    payload: PayloadShape;
}

interface Context {
    state: GithubState;
    dispatch: Dispatch<Action>;
    search: (formData: FormData) => void;
}

const initialState: GithubState = {
    user: {
        login: 'PNkosi',
        id: 89420688,
        avatar_url: 'https://avatars.githubusercontent.com/u/89420688?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/PNkosi',
        html_url: 'https://github.com/PNkosi',
        followers_url: 'https://api.github.com/users/PNkosi/followers',
        following_url: 'https://api.github.com/users/PNkosi/following{/other_user}',
        gists_url: 'https://api.github.com/users/PNkosi/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/PNkosi/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/PNkosi/subscriptions',
        organizations_url: 'https://api.github.com/users/PNkosi/orgs',
        repos_url: 'https://api.github.com/users/PNkosi/repos',
        events_url: 'https://api.github.com/users/PNkosi/events{/privacy}',
        received_events_url: 'https://api.github.com/users/PNkosi/received_events',
        type: 'User',
        site_admin: false,
        name: 'Perfect Nkosi',
        company: 'University of Mpumalanga',
        blog: '',
        location: 'Nelspruit, Mpumalanga. SA',
        email: null,
        hireable: true,
        bio: 'I am a web developer from Mpumalanga, South Africa. I work with Javascript, NodeJs, ExpressJs, ReactJs and MongoDB. I also like anime😁',
        twitter_username: null,
        public_repos: 23,
        public_gists: 0,
        followers: 3,
        following: 4,
        created_at: '2021-08-23T20:18:26Z',
        updated_at: '2023-12-10T14:37:22Z'
    },
    loading: false,
    error: null
}

const GithubContext = createContext<Context>({
    state: initialState,
    dispatch: () => { },
    search: (formData: FormData) => { },
});

const githubReducer = (state: GithubState, action: Action) => {
    switch (action.type) {
        case ActionType.SEARCH_USER:
            return { ...state, loading: true, error: null };
        case ActionType.SEARCH_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload as User };
        case ActionType.SEARCH_USER_ERROR:
            return { ...state, loading: false, error: action.payload as string };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

export const GithubSearchProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer<React.Reducer<GithubState, Action>>(githubReducer, initialState);

    const search = useCallback(async (formData: FormData) => {
        const username = formData.get("username");

        if (!username) {
            dispatch({ type: ActionType.SEARCH_USER_ERROR, payload: "Username is required" });
            return;
        }

        const encodedUsername = encodeURIComponent(username.toString());

        dispatch({ type: ActionType.SEARCH_USER, payload: null });

        try {
            const response = await fetch(`https://api.github.com/users/${encodedUsername}`);
            if (response.ok) {
                const data = await response.json();

                dispatch({ type: ActionType.SEARCH_USER_SUCCESS, payload: data });
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (err: any) {
            dispatch({ type: ActionType.SEARCH_USER_ERROR, payload: err.message });
        }
    }, []);

    const value = {
        state,
        dispatch,
        search
    }

    return (
        <GithubContext.Provider value={value}>
            {children}
        </GithubContext.Provider>
    )
}

export const useGithubSearch = () => {
    const context = useContext(GithubContext);

    if (!context) {
        throw new Error('GithubSearchProvider is missing');
    }

    return {
        ...context
    }
}