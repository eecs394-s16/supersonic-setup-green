# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "Match"
      id: "Match"
      location: "cupid#Match" # Supersonic module#view type navigation
    }
    {
      title: "MyMatch"
      id: "MyMatch"
      location: "cupid#MyMatch"
    }
  ]
  rootView:
    location: "example#getting-started"
  # rootView:
  #   location: "example#getting-started"

  # preloads: [
  #   {
  #     id: "learn-more"
  #     location: "example#learn-more"
  #   }
  #   {
  #     id: "using-the-scanner"
  #     location: "example#using-the-scanner"
  #   }
  # ]

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  initialView:
    id: "initialView"
    location: "cupid#Login"
