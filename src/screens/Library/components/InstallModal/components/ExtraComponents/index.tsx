import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ToggleSwitch } from 'src/components/UI'
import { DLCInfo } from 'src/types'
import { SelectiveDownload } from '../../selective_dl'

type Props = {
  appName: string
  haveDLCs: boolean
  haveSDL: boolean
  sdls: SelectiveDownload[]
  selectedSdls: { [key: string]: boolean }
  installDlcs: boolean
  DLCList: DLCInfo[]
  handleDlcs: () => void
  handleSdl: (sdl: SelectiveDownload, checked: boolean) => void
}

function index({
  handleDlcs,
  handleSdl,
  haveDLCs,
  haveSDL,
  sdls,
  selectedSdls,
  installDlcs,
  DLCList
}: Props) {
  const { t } = useTranslation()

  return (
    <div>
      {(haveDLCs || haveSDL) && (
        <div className="InstallModal__sectionHeader">
          <>{t('sdl.title', 'Select components to Install')}:</>
        </div>
      )}
      {haveSDL && (
        <div className="InstallModal__sdls">
          {sdls.map((sdl: SelectiveDownload) => (
            <label
              key={sdl.name}
              className="InstallModal__toggle toggleWrapper"
            >
              <ToggleSwitch
                title={sdl.name}
                value={!!sdl.mandatory || !!selectedSdls[getUniqueKey(sdl)]}
                disabled={sdl.mandatory}
                handleChange={(e) => handleSdl(sdl, e.target.checked)}
              />
            </label>
          ))}
        </div>
      )}
      {haveDLCs && (
        <div className="InstallModal__dlcs">
          <label className={classNames('InstallModal__toggle toggleWrapper')}>
            <ToggleSwitch
              value={installDlcs}
              handleChange={() => handleDlcs()}
              title={t('dlc.installDlcs', 'Install all DLCs')}
            />
          </label>
          <div className="InstallModal__dlcsList">
            {DLCList.map(({ title }) => title).join(', ')}
          </div>
        </div>
      )}
    </div>
  )
}

function getUniqueKey(sdl: SelectiveDownload) {
  return sdl.tags.join(',')
}

export default index
