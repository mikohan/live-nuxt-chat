export default function(context) {
  if (!Object.keys(context.store.state.user).length) {
    context.redirect('/?message=noUser')
  }
}
