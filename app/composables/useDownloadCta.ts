// Download buttons read "Coming soon" until downloads.available is switched on.
export const useDownloadCta = () => {
  const { downloads } = useAppConfig()
  return {
    available: downloads.available,
    label: (live: string) => (downloads.available ? live : 'Coming soon'),
    icon: (downloads.available ? 'download' : 'clock') as 'download' | 'clock',
  }
}
