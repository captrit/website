---
title: 'Data breach Through Simple Misconfigurations'
date: '2024-01-10'
author: 'Alex Chen, CISO'
excerpt: 'Explore the essential security practices that every enterprise should implement to protect against evolving cyber threats in 2024 and beyond.'
cover: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
category: 'Security'
---


# How I Was Able to Extract Half a Million Users’ Data Through Simple Misconfigurations

Today, I’m going to show you how I was able to extract around half a million users’ data by leveraging some misconfigurations and chaining vulnerabilities. Let’s dive in!

## The Story

I found this vulnerability back in December 2023. Like most days, I was searching for bugs on websites I visit . I have this habit of inspecting websites whenever I have some spare time, especially looking for interesting elements like API keys, endpoints in JavaScript files, and ohter request patterns. I also often try various injection attacks just to test the security.

That day was no different. I visited a website and started my routine: reading the JavaScript files for anything interesting. Unfortunately, nothing stood out. So, I moved on to inspecting HTTP traffic.

## The Way

While analyzing the HTTP traffic, I discovered that the application was using a REST API to fetch and update user data. After some digging, I came across an API endpoint that was used to retrieve user addresses.

![](https://cdn-images-1.medium.com/max/3840/1*lQj27em-xs6wkCI5H_lMzA.png)

Curious, I decided to test this endpoint further. The first thing I tried was a Broken Object Level Authorization (BOLA) attack, also known as an IDOR (Insecure Direct Object Reference) attack in web applications. I attempted to change my user ID parameter to another user’s ID in the request.

However, this initial attempt was blocked, and I received a 401 Unauthorized response.

![401 Unauthorized when using “api”](https://cdn-images-1.medium.com/max/3840/1*N9iSJ6kA-xakEdjQyBdpxA.png)*401 Unauthorized when using “api”*

## Digging Deeper: API Versioning

I wasn’t ready to give up just yet. My next step was to check for any deprecated or older API versions that might still be accessible. I started by altering the API version in the request. Initially, I changed it from "api" to "v1", but that didn’t work. Then, I tried "v2" and – boom! I was able to retrieve another user’s address.

![changed to 200 ok when use “v2”](https://cdn-images-1.medium.com/max/3840/1*cSbC1pid9qxB505oPxum-A.png)*changed to 200 ok when use “v2”*

## Brute Forcing User Data

Realizing that I had found a vulnerability, I began testing further by brute-forcing user IDs to enumerate more addresses. During the brute-forcing process, I noticed that the application didn’t have any rate limiting in place, allowing me to extract a significant amount of user data without being blocked.

In just two hours, I managed to extract around 100,000 user addresses.

![Intruder result](https://cdn-images-1.medium.com/max/3840/1*kJd8hIhe0zmyClpTyS6TFg.png)*Intruder result*

## Conclusion: A Chain of Vulnerabilities

This wasn’t just one vulnerability. It was a chain of multiple issues that, when combined, led to a massive data breach:

1. **Improper Asset Management** — Deprecated APIs were still accessible.

1. **Broken Access Control** — The v2 API version allowed unauthorized access to user data.

1. **No Rate Limiting** — The absence of rate limiting enabled me to extract a large volume of user data without any restrictions.

By exploiting these misconfigurations, I was able to access and extract the personal data of hundreds of thousands of users. This incident highlights the importance of proper security hygiene, including access controls, asset management, and implementing rate limiting in APIs.
