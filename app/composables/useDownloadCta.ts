// Download buttons read "Coming soon" until at least one platform's
// installer is switched on in app.config.
export const useDownloadCta = () => {
  const { downloads } = useAppConfig()
  const live = downloads.platforms.filter((p) => p.available)
  const available = live.length > 0
  return {
    available,
    // "Linux", "macOS & Linux", "macOS, Windows & Linux"
    platforms: live.map((p) => p.name).join(', ').replace(/, ([^,]*)$/, ' & $1'),
    all: live.length === downloads.platforms.length,
    label: (text: string) => (available ? text : 'Coming soon'),
    icon: (available ? 'download' : 'clock') as 'download' | 'clock',
    url: (name: string) => `${downloads.download}/v${downloads.version}/${name.replaceAll('{v}', downloads.version)}`,
  }
}
