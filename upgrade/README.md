# T3 Upgrade

T3 Upgrade Helper is a project designed to assist users in upgrading from their current version of the T3 stack to the latest version.

## Usage

On the website, select the version you are currently on and the version you want to upgrade to. The website will then show you a diff of the changes between the two versions.

1. Apply the diff

   To apply the patch, you can use the following command:

```bash
git apply --reject ./t3-upgrade.patch
```

This will create a new file with the changes that could not be applied.

2. Apply the changes manually

   You can then use wiggle to apply the changes manually:

```bash
wiggle -r ./package.json ./package.json.rej
```

This will apply the changes to the file and create a file called package.json.porig with the original file.

3. Resolve conflicts

   In case of conflicts, it will add the conflict markers to the file. You can then resolve the conflicts manually.

## Contributing

If you want to contribute to this project, follow the steps below:

1. Raise an issue with the changes you want to make (or find an existing issue)
2. Fork the repository
3. Make your changes
4. Create a pull request
