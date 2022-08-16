---
id: getting-started
title: Getting started on your T3 App
sidebar_label: Getting started
slug: /getting-started
---

We'll be frank - this is an opinionated project. We share a handful of core beliefs around building and we treat them as the basis for our decisions.

### Solve Problems

It's easy to fall in the trap of "adding everything" - we explicitly don't want to do that. Everything added to create-t3-app should solve a specific problem that exists within the core technologies included. This means we won't add things like state libraries (zustand, redux) but we will add things like NextAuth.js and integrate Prisma and tRPC for you.

### Bleed Responsibly

We love our bleeding edge tech. The amount of speed and, honestly, fun that comes out of new shit is really cool. We think it's important to bleed responsibly, using riskier tech in the less risky parts. This means we wouldn't ⛔️ bet on risky new database tech (SQL is great!). But we happily ✅ bet on tRPC since it's just functions that are trivial to move off.

### Typesafety Isn't Optional

Two of the three T's are typesafe (Typescript, tRPC). We take typesafety seriously in these parts. Any decision that compromises the full-stack, typesafe nature of create-t3-app is a decision that should be made in a different project. The stated goal of create-t3-app is to provide the quickest way to start a new fullstack, type safe web application.
