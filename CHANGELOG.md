# Changelog

## 5.7.0

### Minor Changes

- 7a76c95: feat(app): add lint config for typescript

## [5.6.0](https://github.com/t3-oss/create-t3-app/compare/v5.5.0...v5.6.0) (2022-08-11)

### Features

- Include ct3a version as metadata in generated app ([#305](https://github.com/t3-oss/create-t3-app/issues/305)) ([0be4a97](https://github.com/t3-oss/create-t3-app/commit/0be4a97fdf1c7bfab78d7be2051c2b21e665c491))

### Bug Fixes

- change ! reversion to equality in env validation ([#293](https://github.com/t3-oss/create-t3-app/issues/293)) ([7822c43](https://github.com/t3-oss/create-t3-app/commit/7822c433df18011f0cc6748e2c499c0e4283386c))
- parse path returned from process.cwd() before using it ([#303](https://github.com/t3-oss/create-t3-app/issues/303)) ([b55f196](https://github.com/t3-oss/create-t3-app/commit/b55f196d0146c5c3969de4c25e7732046aad6284))

## [5.5.0](https://github.com/t3-oss/create-t3-app/compare/v5.4.0...v5.5.0) (2022-08-07)

### Features

- make session.user.id non-nullable ([#282](https://github.com/t3-oss/create-t3-app/issues/282)) ([6a81f03](https://github.com/t3-oss/create-t3-app/commit/6a81f03bfafdf77c1c82b7972a97e3e54d77935c))

## [5.4.0](https://github.com/t3-oss/create-t3-app/compare/v5.3.0...v5.4.0) (2022-08-02)

### Features

- add deployment strategy to generated README ([#258](https://github.com/t3-oss/create-t3-app/issues/258)) ([c7d4dce](https://github.com/t3-oss/create-t3-app/commit/c7d4dce182b1c306dc2a41d42483994c336843f4))
- set appName to directory on 'npx create-t3-app .' ([#273](https://github.com/t3-oss/create-t3-app/issues/273)) ([2179f2d](https://github.com/t3-oss/create-t3-app/commit/2179f2d38f74de0e3fda5661f5125d049eb4d238))

### Bug Fixes

- height on small screens ([#256](https://github.com/t3-oss/create-t3-app/issues/256)) ([fe86915](https://github.com/t3-oss/create-t3-app/commit/fe86915ced72dc979e5fe68bd56b038d9c714928))
- missing next-auth types ([#255](https://github.com/t3-oss/create-t3-app/issues/255)) ([ed42629](https://github.com/t3-oss/create-t3-app/commit/ed42629be5fb9be72abd40bbe784f2bda99eec99)), closes [#254](https://github.com/t3-oss/create-t3-app/issues/254)
- **prisma:** make db changes for next-auth on mysql obvious ([#275](https://github.com/t3-oss/create-t3-app/issues/275)) ([e9507c8](https://github.com/t3-oss/create-t3-app/commit/e9507c887e135f3e44357c618689f5cdb2f13c43))

## [5.3.0](https://github.com/t3-oss/create-t3-app/compare/v5.2.1...v5.3.0) (2022-07-25)

### Features

- add typesafe client side env variables ([#209](https://github.com/t3-oss/create-t3-app/issues/209)) ([d4cf879](https://github.com/t3-oss/create-t3-app/commit/d4cf879df811ded012a5f7cb3d91ff0bb95d87ac))
- improved logo typography ([#238](https://github.com/t3-oss/create-t3-app/issues/238)) ([48c6720](https://github.com/t3-oss/create-t3-app/commit/48c67207da48c901822e214a00285c99bb785fd8))
- updating tailwind and postcss config's to use .cjs ([#242](https://github.com/t3-oss/create-t3-app/issues/242)) ([5b97367](https://github.com/t3-oss/create-t3-app/commit/5b973670cae729c9e93b6c3c6f0b3e5b48dda904))

### Bug Fixes

- added JSDoc type to clientEnv in all env-schema ([#240](https://github.com/t3-oss/create-t3-app/issues/240)) ([9cb5ebb](https://github.com/t3-oss/create-t3-app/commit/9cb5ebbb2a0147ce15726c7e1a6c6be4065bc2dc))
- clarify some comments and rename some files in env ([#245](https://github.com/t3-oss/create-t3-app/issues/245)) ([2048783](https://github.com/t3-oss/create-t3-app/commit/2048783bd26f7f0522357a3ab1e74e6f560a221c))
- remove semicolon in \_app.tsx with next-auth to avoid early return ([1be7713](https://github.com/t3-oss/create-t3-app/commit/1be771393628631b818b46d3f3bf1ca41ad99dce))
- title being offset when using yarn/pnpm ([c881f00](https://github.com/t3-oss/create-t3-app/commit/c881f00430f606040a448eecc41e779ab0c728a7))

### [5.2.1](https://github.com/t3-oss/create-t3-app/compare/v5.2.0...v5.2.1) (2022-07-19)

### Bug Fixes

- update url in auth prisma schema ([97c9e27](https://github.com/t3-oss/create-t3-app/commit/97c9e279bf7465a47f29add10c8a6d4c9b7339a5))

## [5.2.0](https://github.com/t3-oss/create-t3-app/compare/v5.1.1...v5.2.0) (2022-07-19)

### Features

- add db.sqlite-journal to gitignore ([#221](https://github.com/t3-oss/create-t3-app/issues/221)) ([0604d21](https://github.com/t3-oss/create-t3-app/commit/0604d217f0dfe3d165013395c1a801e6bc32a17c))

### Bug Fixes

- handle pkg with version in noInstall mode ([#220](https://github.com/t3-oss/create-t3-app/issues/220)) ([5737beb](https://github.com/t3-oss/create-t3-app/commit/5737bebaab3ff6f955bf825274e25419a91642d6))
- missing DATABASE_URL ([#222](https://github.com/t3-oss/create-t3-app/issues/222)) ([b6164d8](https://github.com/t3-oss/create-t3-app/commit/b6164d8944330564e9911e47f36d82620986c8c5))
- typo - rename 'varibles' to 'variables' ([#223](https://github.com/t3-oss/create-t3-app/issues/223)) ([fc6519f](https://github.com/t3-oss/create-t3-app/commit/fc6519f66d067e4e348c7f4c00f6287dc5c40c3d))
- typo in readme ([9390400](https://github.com/t3-oss/create-t3-app/commit/9390400b8720240c650e5dbde7ca0718b7835757))

### [5.1.1](https://github.com/t3-oss/create-t3-app/compare/v5.1.0...v5.1.1) (2022-07-18)

### Bug Fixes

- add missing trpc import ([37b6283](https://github.com/t3-oss/create-t3-app/commit/37b6283bb56e44092fc9ef2d65c84e5298e51d22))

## [5.1.0](https://github.com/t3-oss/create-t3-app/compare/v5.0.0...v5.1.0) (2022-07-18)

### Features

- add trpc inference helpers ([1fcec81](https://github.com/t3-oss/create-t3-app/commit/1fcec81a74372ce5cfaf6503d63f16d5e2b12e3c))
- migrate env + next config to esm ([#205](https://github.com/t3-oss/create-t3-app/issues/205)) ([59f8ad4](https://github.com/t3-oss/create-t3-app/commit/59f8ad4f2104aa1f11508b55da75c333dce03625))

### Bug Fixes

- **#218:** lock react-query to v3 ([15ea5f1](https://github.com/t3-oss/create-t3-app/commit/15ea5f1dc8b86430a720f2eaeb6ccdfaab629892)), closes [#218](https://github.com/t3-oss/create-t3-app/issues/218)
- move gitignore rename call ([#215](https://github.com/t3-oss/create-t3-app/issues/215)) ([7111033](https://github.com/t3-oss/create-t3-app/commit/7111033d75c858041f06d69e95c51e40515457fc))

## 5.0.0 (2022-07-16)

### Features

- add check for yarn 3 ([#173](https://github.com/t3-oss/create-t3-app/issues/173)) ([cd846e1](https://github.com/t3-oss/create-t3-app/commit/cd846e16123a6bb11549276030224ec4ff1223df))
- add ci for pull requests ([0e7cdc8](https://github.com/t3-oss/create-t3-app/commit/0e7cdc8bd307e17e95bd1874af2d0eb43211530e))
- add commitlint ([#126](https://github.com/t3-oss/create-t3-app/issues/126)) ([3672aa3](https://github.com/t3-oss/create-t3-app/commit/3672aa3f4482ef592022cd94f1300b81e3fa7429))
- add CONTRIBUTING.md for newcomers ([99f8220](https://github.com/t3-oss/create-t3-app/commit/99f8220f83a6363e5aab6c0ec33260eb059c9643))
- add db.sqlite to gitignore ([#201](https://github.com/t3-oss/create-t3-app/issues/201)) ([90371c7](https://github.com/t3-oss/create-t3-app/commit/90371c7f88258b4b3e9a2689c09f67a9e439b189))
- add environment variables validation ([#147](https://github.com/t3-oss/create-t3-app/issues/147)) ([0f0b56d](https://github.com/t3-oss/create-t3-app/commit/0f0b56d2604c1ba9dccd8d2a5213f0d2a640cd68))
- add git prompt ([#130](https://github.com/t3-oss/create-t3-app/issues/130)) ([e5be271](https://github.com/t3-oss/create-t3-app/commit/e5be271612db741e3a692cd780ef84455faa115c))
- add inferQueryResponse helper for tRPC ([748800f](https://github.com/t3-oss/create-t3-app/commit/748800f060031da58ce2b45bd65e4fd83266ce5c))
- add main as initial branch ([7b94005](https://github.com/t3-oss/create-t3-app/commit/7b94005fd515d140176e639a487ab5035a290125))
- add next-auth config to env-example [#108](https://github.com/t3-oss/create-t3-app/issues/108) ([c3ab997](https://github.com/t3-oss/create-t3-app/commit/c3ab997f149ee3635d2d33a67650e95e04877d5b))
- add noInstall flag and prompt ([#133](https://github.com/t3-oss/create-t3-app/issues/133)) ([7ff0fca](https://github.com/t3-oss/create-t3-app/commit/7ff0fcacc3b94a4fd15d0db25e2efc09131d73c9))
- add standard-version ([#125](https://github.com/t3-oss/create-t3-app/issues/125)) ([0fc6b47](https://github.com/t3-oss/create-t3-app/commit/0fc6b479c99c76ab830a81d011ba0e4ef90ce849))
- add tRPC inference helper docs commment on utils ([3e784cb](https://github.com/t3-oss/create-t3-app/commit/3e784cbf3f9b4f6eeb4441a881ebbd028f311957))
- added windows build support ([29acbf8](https://github.com/t3-oss/create-t3-app/commit/29acbf816c69f980454568946fba1afea6be114c))
- better ui for templates ([e2e8c7e](https://github.com/t3-oss/create-t3-app/commit/e2e8c7eeeab576d730cd1c7e397497460c1787e0))
- better validation and add path support ([#135](https://github.com/t3-oss/create-t3-app/issues/135)) ([e50cb8a](https://github.com/t3-oss/create-t3-app/commit/e50cb8a3e13126de628d098e00650a52753681f3))
- check if dir is empty ([71bbdba](https://github.com/t3-oss/create-t3-app/commit/71bbdbae564d6e7df4b08645db59a8364b891b99))
- make the ui symmetric ([19df71e](https://github.com/t3-oss/create-t3-app/commit/19df71ec53fd64e60b27ecd055cd9f0c6acc4a63))

### Bug Fixes

- add newline at the end of the file ([64eee1c](https://github.com/t3-oss/create-t3-app/commit/64eee1c8058aa5d2ec29fc1903ee63819fa8fc9d))
- add scripts for CI ([539f3fd](https://github.com/t3-oss/create-t3-app/commit/539f3fdc44e1d96e5429f21afbb74f71bf4d963d))
- add semantic elements and update tw classes on tw pages ([#151](https://github.com/t3-oss/create-t3-app/issues/151)) ([61d6819](https://github.com/t3-oss/create-t3-app/commit/61d6819f14ac5b65c779081c91ca894f724f7b16))
- bumped package.json for beta-release ([3fe35f1](https://github.com/t3-oss/create-t3-app/commit/3fe35f14313da611cb16e26141e06d1afb5efb78))
- change comment in .env to discord ([d992713](https://github.com/t3-oss/create-t3-app/commit/d992713cad08c08267a0f018fa8582b569a554db))
- **cli:** use correct spelling, fix short choices ([7776aa9](https://github.com/t3-oss/create-t3-app/commit/7776aa9fc03293f27d9e27808cd03810f96ccc33))
- conditionally run envVars installer ([#196](https://github.com/t3-oss/create-t3-app/issues/196)) ([f5f4f62](https://github.com/t3-oss/create-t3-app/commit/f5f4f6275c1a967f6de2e7c6d40d9a7731a3830b))
- docs wrong format ([3d2dbb0](https://github.com/t3-oss/create-t3-app/commit/3d2dbb06cadb42d24f134ce09edc5a371d79aff9))
- dont prompt for typesafe env-vars ([2faee56](https://github.com/t3-oss/create-t3-app/commit/2faee56720c39d770ebe05d15e3fb2aaacaf704e))
- eslint warning (import/no-anonymous-default-export) ([a1cce55](https://github.com/t3-oss/create-t3-app/commit/a1cce5546a8fd6efb79c65a2f2b52d4c597dafd0))
- fixed some typos ([#131](https://github.com/t3-oss/create-t3-app/issues/131)) ([a86466e](https://github.com/t3-oss/create-t3-app/commit/a86466eb0bc1ef51a1c8ba1b96938dc1bd7dfbbb))
- format contributing.md ([4111476](https://github.com/t3-oss/create-t3-app/commit/41114766582ca33fb2a3fd0b566e609a6dd3e861))
- handle git projects correctly ([3ed897f](https://github.com/t3-oss/create-t3-app/commit/3ed897ff49c06f6d70d49aee31d5c3741fced96e))
- incompatible git version ([#127](https://github.com/t3-oss/create-t3-app/issues/127)) ([34f44f8](https://github.com/t3-oss/create-t3-app/commit/34f44f817df52b317afea5b8d55c87eea487833f))
- invalid pnpm action version ([2a1f6e3](https://github.com/t3-oss/create-t3-app/commit/2a1f6e32aedb8f86ee7ca403e481be8e474b76b2))
- language prompt short answer should both be ts ([#142](https://github.com/t3-oss/create-t3-app/issues/142)) ([5e4f80d](https://github.com/t3-oss/create-t3-app/commit/5e4f80d7aa930f16add3bb2273a23f5829548f49))
- **markup:** multiple h1 replaced to h2 ([6bf9040](https://github.com/t3-oss/create-t3-app/commit/6bf90407b9a9774348a77927d37c47f3ded5552a))
- **prompts:** show correct package manager in prompts ([#153](https://github.com/t3-oss/create-t3-app/issues/153)) ([fe66ae9](https://github.com/t3-oss/create-t3-app/commit/fe66ae9f60cbe6a2e429be406a1cd548c51e7bbd))
- properly display the welcome title when installing with Yarn ([#160](https://github.com/t3-oss/create-t3-app/issues/160)) ([a5b9d53](https://github.com/t3-oss/create-t3-app/commit/a5b9d534e6395e494dcfab8419e71bf201b7326b))
- provide cwd inside git init exec call ([9679492](https://github.com/t3-oss/create-t3-app/commit/9679492ebd9175973c99d647cf11a4f1b979a505))
- reapply style fixes on tw pages ([#189](https://github.com/t3-oss/create-t3-app/issues/189)) ([af1067b](https://github.com/t3-oss/create-t3-app/commit/af1067b196205b0dd70a44571c62012d9667987e)), closes [#178](https://github.com/t3-oss/create-t3-app/issues/178)
- remove changeset from repo ([#134](https://github.com/t3-oss/create-t3-app/issues/134)) ([d58b380](https://github.com/t3-oss/create-t3-app/commit/d58b380ed4310021a771e05037a6054176c14b91))
- remove duplicated types ([#138](https://github.com/t3-oss/create-t3-app/issues/138)) ([e4c8e33](https://github.com/t3-oss/create-t3-app/commit/e4c8e336fff94bd125cac06f4bfa4d5eb365dd54))
- remove unncesary import on auth router ([abdc61f](https://github.com/t3-oss/create-t3-app/commit/abdc61ffc18dd4f1e82f3fc02cd87a2144d0cc03))
- run prettier ([9961645](https://github.com/t3-oss/create-t3-app/commit/99616456d54abde5b458d57add1132dcb2b68256))
- standardize log messages ([83a13b9](https://github.com/t3-oss/create-t3-app/commit/83a13b9963f83317a62e3eeaed14dd5e2cb45344))
- **template:** converting to use tech props and remove tw from template ([#183](https://github.com/t3-oss/create-t3-app/issues/183)) ([b2d542a](https://github.com/t3-oss/create-t3-app/commit/b2d542a44eed0aa699fe91e52f25f6ac68a0021c))
- **templates:** h1 restored ([e51e03d](https://github.com/t3-oss/create-t3-app/commit/e51e03d93a899674bef839ddb215a36e62397e26))
- type entrire app and not just the props ([908630e](https://github.com/t3-oss/create-t3-app/commit/908630e5cc14789b88a0ddf6dd097fb14eb9068a))
- typo in "Javascript" ([#136](https://github.com/t3-oss/create-t3-app/issues/136)) ([6873a7a](https://github.com/t3-oss/create-t3-app/commit/6873a7a5ff17c6efda1b78fe73597ec43821552c))
- update templates ([4418f1d](https://github.com/t3-oss/create-t3-app/commit/4418f1db06a29050293f0d4dd16a1347d34c6cf9))
- use components for the tech within the splash screen ([#178](https://github.com/t3-oss/create-t3-app/issues/178)) ([c436382](https://github.com/t3-oss/create-t3-app/commit/c4363821664fe95b4301d46b3e2d34fbeb14952d))
- with-tw removed unused styles and added motion saftey ([#148](https://github.com/t3-oss/create-t3-app/issues/148)) ([598ed0e](https://github.com/t3-oss/create-t3-app/commit/598ed0eda73e5218658ff7d574e28ecc25a4e2cb))

## 4.4.1

### Patch Changes

- changed ui for template

## 4.4.0

### Minor Changes

- improve ui examples of template app

## 4.3.5

### Patch Changes

- add warning for old git versions

## 4.3.4

### Patch Changes

- improve template styling

## 4.3.3

### Patch Changes

- Add description for packages in the template

## 4.3.2

### Patch Changes

- Redesign pages

## 4.3.0

### Minor Changes

- added Next-Auth protected routes when using tRPC

## 4.2.12

### Patch Changes

- upgrade next to 12.2.0

## 4.2.11

### Patch Changes

- modified the title to print a colorful ascii art

## 4.2.10

### Patch Changes

- add warning about next-auth when using Node 18

## 4.2.9

### Patch Changes

- fix resolved path to package root

## 4.2.8

### Patch Changes

- diable version flag

## 4.2.2

### Patch Changes

- fix esm issues

## 4.2.1

### Patch Changes

- trying to fix esm error

## 4.2.0

### Minor Changes

- a548f22: added cli args, esm support

## 4.1.1

### Patch Changes

- Updated package to full ESM support

## 4.1.0

### Minor Changes

- Create-t3-app now accepts args!

  When calling create-t3-app, you can specify the app name and directory directly from the cli.

  Additonal options are visable by passing -h or --help into the command line

## 4.0.8

### Patch Changes

- added loading spinners

## 4.0.7

### Patch Changes

- added tsup as build tool

## 4.0.6

### Patch Changes

- Added dev tooling.
