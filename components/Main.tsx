"use client"
import { FC } from 'react'
import React, { useState } from 'react';
import Loading from './Loading';
import { handleSubmit } from '@/actions/handleSubmitURL';
const Main: FC = () => {

    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [urlLength, setUrlLength] = useState(5);
    const [customUrlCode, setCustomUrlCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [urlType, setUrlType] = useState('random');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
    };


    return <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">URL Shortener</h1>

                <form onSubmit={(e) => { handleSubmit(e, setLoading, setShortUrl, longUrl, urlLength, customUrlCode) }} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Enter a long URL"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        className="px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {urlType !== 'custom' && (<input
                        type="number"
                        placeholder="Enter the length of the short URL"
                        value={urlLength}
                        onChange={(e) => setUrlLength(Number(e.target.value))}
                        className="px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />)}
                    <div className="flex items-center space-x-4 justify-center">
                        <input
                            type="radio"
                            id="random"
                            name="urlType"
                            value="random"
                            checked={urlType === 'random'}
                            onChange={() => setUrlType('random')}
                            className="text-black"
                        />
                        <label htmlFor="random " className='text-black'>Random</label>
                        <input
                            type="radio"
                            id="custom"
                            name="urlType"
                            value="custom"
                            checked={urlType === 'custom'}
                            onChange={() => setUrlType('custom')}
                            className="text-black"
                        />
                        <label htmlFor="custom " className='text-black'>Custom</label>
                    </div>
                    {urlType === 'custom' && (
                        <input
                            type="text"
                            placeholder="Enter a custom URL code"
                            value={customUrlCode}
                            onChange={(e) => setCustomUrlCode(e.target.value)}
                            className="px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
                    >
                        {loading ? <Loading size={8} /> : 'Shorten URL'}
                    </button>
                </form>

                {shortUrl && (
                    <div className="mt-6">
                        <p className="text-lg font-semibold mb-2">Short URL:</p>
                        <div className="flex items-center">
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-800 transition-colors duration-300"
                            >
                                {shortUrl}
                            </a>
                            <button
                                onClick={copyToClipboard}
                                className="ml-2 px-2 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </>
}

export default Main




