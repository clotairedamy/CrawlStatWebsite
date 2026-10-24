---
title: Installing CrawlStat
description: How to download and install CrawlStat on macOS, Windows or Linux, where it keeps its files, and how to remove it cleanly.
section: Start here
order: 2
---

## Supported systems

CrawlStat is a native desktop app for three platforms:

| Platform | Supported versions | Download |
| --- | --- | --- |
| **macOS** | macOS 11 or later, on Apple Silicon or Intel | Disk image (`.dmg`) |
| **Windows** | Windows 10 and 11, 64-bit | Installer |
| **Linux** | x86-64 | AppImage or `.deb` package |

You don't need an account to install or use it. The free tier works as soon as the app opens.

## Download

Go to [the downloads page](/download) and pick the build for your system. Installers are published with each release, so the downloads page always points at the latest version.

## Install

### macOS

::steps
1. Open the downloaded `.dmg` file.
2. Drag **CrawlStat** into your **Applications** folder.
3. Open CrawlStat from Applications or Launchpad.
::

If you're not sure which Mac you have, choose **About This Mac** from the Apple menu. "Chip: Apple M…" means Apple Silicon. "Processor: Intel…" means Intel.

### Windows

::steps
1. Run the downloaded installer.
2. Follow the prompts.
3. Open CrawlStat from the Start menu.
::

### Linux

For the **AppImage**, make the file executable and run it:

```bash
chmod +x CrawlStat-*.AppImage
./CrawlStat-*.AppImage
```

For the **`.deb` package** (Debian, Ubuntu and derivatives):

```bash
sudo apt install ./crawlstat_*_amd64.deb
```

## Where CrawlStat keeps its files

CrawlStat stores its settings, its list of recent crawls and the crawls themselves in your user's application data folder:

| Platform | Folder |
| --- | --- |
| macOS | `~/Library/Application Support/CrawlStat` |
| Windows | `%APPDATA%\CrawlStat` |
| Linux | `$XDG_DATA_HOME/crawlstat`, or `~/.local/share/crawlstat` if that variable isn't set |

Inside that folder:

- `projects/` holds your crawls, one `.db` file per crawl.
- `settings.json` holds your crawl defaults and preferences.
- `recent.json` is the list shown on the Projects screen.

CSV exports go to your **Downloads** folder (or your home folder if there's no Downloads folder). You can see both paths at the bottom of the **Settings** screen.

If you have a Pro licence, the key is kept in your operating system's secure credential store (Keychain on macOS, for example), not in these files.

::callout{type="tip"}
A crawl is a single file, so backing one up or moving it to another computer is just a matter of copying the `.db` file. Copy it while CrawlStat isn't using it.
::

## Updating

To update, download the latest version from [the downloads page](/download) and install it over the old one. Your crawls, settings and licence are kept in the folders above, so an update doesn't touch them.

The audits are built into the app, not saved in your crawl files. After updating, you can open an old crawl and click **Re-run audits** on the Issues screen to check it against the newest version of every audit.

## Uninstalling

Remove the app the usual way for your platform:

- **macOS:** drag CrawlStat from Applications to the Bin.
- **Windows:** use **Settings → Apps**.
- **Linux:** delete the AppImage, or run `sudo apt remove crawlstat` if you installed the package.

Uninstalling the app leaves your crawls and settings where they are, so a reinstall picks up where you left off. To remove everything, delete the application data folder listed above as well.

::callout{type="warning"}
If you have a Pro licence, deactivate it in **Settings** before you uninstall. That frees the seat for another machine. See [Licensing](/docs/licensing).
::

## Next

Ready to go? Start [your first crawl](/docs/your-first-crawl).
