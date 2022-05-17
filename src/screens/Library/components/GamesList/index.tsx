import React, { useContext } from 'react'
import { GameInfo, Runner } from 'src/types'
import cx from 'classnames'
import GameCard from '../GameCard'
import ContextProvider from 'src/state/ContextProvider'

interface Props {
  library: GameInfo[]
  layout?: string
  handleGameCardClick: (runner: Runner, gameinfo: GameInfo) => void
}

export const GamesList = ({
  library = [],
  layout = 'grid',
  handleGameCardClick
}: Props): JSX.Element => {
  const { gameUpdates } = useContext(ContextProvider)

  return (
    <div
      style={!library.length ? { backgroundColor: 'transparent' } : {}}
      className={cx({
        gameList: layout === 'grid',
        gameListLayout: layout !== 'grid'
      })}
    >
      {!!library.length &&
        library.map((gameinfo) => {
          const {
            title,
            art_square,
            art_cover,
            art_logo,
            app_name,
            is_installed,
            runner,
            cloud_save_enabled,
            is_game,
            install: { version, install_size, is_dlc, platform }
          } = gameinfo
          if (is_dlc) {
            return null
          }
          const hasUpdate = gameUpdates?.includes(app_name)
          return (
            <GameCard
              key={app_name}
              runner={runner}
              cover={art_square}
              coverList={art_cover}
              logo={art_logo}
              hasCloudSave={cloud_save_enabled}
              title={title}
              appName={app_name}
              isInstalled={is_installed}
              isGame={is_game}
              version={`${version}`}
              size={`${install_size}`}
              hasUpdate={hasUpdate}
              buttonClick={() => handleGameCardClick(runner, gameinfo)}
              forceCard={layout === 'grid'}
              installedPlatform={platform}
            />
          )
        })}
    </div>
  )
}
