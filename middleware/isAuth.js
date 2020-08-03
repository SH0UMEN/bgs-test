export default function (context) {
  if (context.store.state.token) {
    return context.redirect('/user')
  }
}
