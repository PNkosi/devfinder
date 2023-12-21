"use client"

import React from 'react'
import Link from 'next/link'
import { CiLink, CiLocationOn, CiTwitter } from 'react-icons/ci'
import { PiBuildingsLight } from 'react-icons/pi'
import { useGithubSearch } from '../../providers/GithubSearchProvider'
import { convertDateFormat } from '@/utils'

/**
 * UserCard component displays user information fetched from Github.
 * 
 * Renders user avatar, name, bio, stats like followers/following count, 
 * location, twitter handle, blog, company etc.
 * 
 * Uses GithubSearchContext to access Github API response.
 * Renders fallback texts if user info not available.
 * Formats dates using utility function.
*/
const UserCard = () => {
    const { state } = useGithubSearch()
    return (
        <div className='mx-4'>
            <div className='container flex flex-col gap-6 mt-6 bg-bluish-gray p-6 rounded-xl '>
                <div className='flex items-start gap-4'>
                    <img className='w-20 h-20 md:w-40 md:h-40 rounded-full' src={state.user?.avatar_url} />
                    <div className='flex flex-col md:flex-row gap-4 justify-between w-full'>
                        <h4 className='font-bold md:text-3xl'>{state.user?.name} <br />
                            <Link href={state.user?.html_url as string} target='_blank' className='text-primary text-[10px]'>@{state.user?.login}</Link>
                            <br />
                        </h4>
                        <h4 className='text-[12px]  text-slate-600 dark:text-slate-400'>Joined {convertDateFormat(state.user?.created_at as string)}</h4>
                    </div>

                </div>
                <p className='text-sm leading-loose'>{state.user?.bio || 'This profile has no bio'}</p>

                <div className='flex items-center justify-between md:justify-evenly gap-4 bg-background p-6 rounded-xl'>
                    <p className='text-[10px] md:text-sm font-semibold text-slate-600 dark:text-slate-400'>
                        Repos<span className='block mt-3 text-foreground'>{state.user?.public_repos}</span>
                    </p>
                    <p className='text-[10px] md:text-sm font-semibold text-slate-600 dark:text-slate-400'>
                        Followers <span className='block mt-3 text-foreground'>{state.user?.followers}</span>
                    </p>
                    <p className='text-[10px] md:text-sm font-semibold text-slate-600 dark:text-slate-400'>
                        Following <span className='block mt-3 text-foreground'>{state.user?.following}</span>
                    </p>
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                    <p className='text-[12px]  text-slate-600 dark:text-slate-400'>
                        <CiLocationOn size={20} className='inline mr-2 text-foreground' />
                        {state.user?.location || 'Not specified'}
                    </p>

                    <p className='text-[12px]  text-slate-600 dark:text-slate-400'>
                        <CiTwitter size={20} className='inline mr-2 text-foreground' />
                        {state.user?.twitter_username || 'Not available'}
                    </p>
                    <p className='text-[12px]  text-slate-600 dark:text-slate-400'>
                        <CiLink size={20} className='inline mr-2 text-foreground' />
                        {state.user?.blog || 'Not available'}
                    </p>
                    <p className='text-[12px]  text-slate-600 dark:text-slate-400'>
                        <PiBuildingsLight size={20} className='inline mr-2 text-foreground' />
                        {state.user?.company || 'Not available'}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default UserCard