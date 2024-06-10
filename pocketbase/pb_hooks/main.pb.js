/* eslint-disable no-undef */
onModelAfterUpdate((e) => {
  if (e.model.get('played')) {
    const matchId = e.model.get('id')
    const home = e.model.get('home_goals')
    const away = e.model.get('away_goals')

    // Update bets
    const bets = $app.dao().findRecordsByFilter('bets', `match = "${matchId}"`)

    for (const bet of bets) {
      const form = new RecordUpsertForm($app, bet)

      let points = 0

      if (bet.get('home') === home && bet.get('away') === away) {
        points = 4
      } else if (bet.get('home') - bet.get('away') === home - away) {
        points = 3
      } else if (bet.get('home') > bet.get('away') && home > away) {
        points = 2
      }

      form.loadData({
        points
      })

      form.submit()
    }

    // Update points at users
    try {
      $app.dao().db()
        .newQuery('UPDATE users SET points = (SELECT SUM(points) FROM bets WHERE user = users.id GROUP BY user)')
        .execute()
    } catch (e) {
      console.error(e)
    }
  }
}, 'matches')
