# UP FOR DEBATE

The approach to this setup should probably be looked over so that there doesn't have to be this many template-files.

This approach will be increasingly difficult with the new layouts RFC where the structure will be even more complex.

The necessary pages should probably be generated with some codemod tooling so that there can be a minimal amount of templates. What I can think of right now is:

- \_app.tsx: There will probably be 2 of this: with-trpc and without-trpc. Adding the session-provider for next-auth should be relatively trivial by using some codemod tool
- index.tsx: There will probably be 2 of this: with-tw and without-tw. adding example usages for trpc, auth can probably be injected with codemod.
