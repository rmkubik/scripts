# how to execute script
# curl https://raw.githubusercontent.com/rmkubik/scripts/master/mac_setup.sh | bash -s 'email@address.com'
# ./mac_setup.sh 'email@address.com'

# install xcode cli tools for homebrew
xcode-select --install

# install Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# install & authenticate with mac app store cli
brew install mas
mas signin --dialog $1

# install graphical applications with homebrew
brew tap caskroom/cask

# install applications
brew install git
brew install npm
# TODO: install python3

brew cask install visual-studio-code
# brew cask install android-studio
brew cask install firefox
brew cask install google-chrome
brew cask install spectacle
brew cask install alfred
brew cask install vlc
brew cask install slack
brew cask install discord
brew cask install spotify
brew cask install steam
brew cask install itch # this will also install butler cli
# brew cask install arduino

# mas install 497799835 # Xcode

# nvm doesn't support install through Homebrew
curl x https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
nvm install node

# npm install --global surge
npm install -g local-web-server
# TODO: install TypeScript compiler?
# TODO: install gulp?
# TODO: linters? prettier?

# install rvm
\curl -sSL https://get.rvm.io | bash -s stable
rvm install ruby-head
# TODO: any gems?

# configure git
git config --global user.name "Ryan Kubik"
git config --global user.email $1
git config --global color.ui "true"
git config --global push.default simple
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.br branch
git config --global credential.helper osxkeychain

# copy dotfiles from github
git clone --bare https://github.com/rmkubik/dotfiles.git $HOME/.dotfiles
dotfiles checkout # cannot use dotfiles alias here

# curl ~/.ssh TODO
# curl ~/.duti TODO
# curl ~/.gitconfig instead or above --global commands? TODO

# configure SSH keys
# TODO: setup work & personal keys

# Add extensions to vs code
code --install-extension dawhite.mustache
code --install-extension dbaeumer.jshint
code --install-extension eamodio.gitlens
code --install-extension johob.pico8-vscode
code --install-extension Tyriar.sort-lines
# save my editor preferences & workspaces

# style the terminal
git clone https://github.com/lysyi3m/osx-terminal-themes ~/git/osx-terminal-themes/
open ~/git/osx-terminal-themes/schemes/AdventureTime.terminal # Shell > Use Settings as Default to save
# TODO: Get the apple script for saving the theme

# git clone the scripts directory

# script for tab completion in git commands
# curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash
# this should be in dotfiles repo now

# start Spectacle and Alfred and give them permissions
# set spotlight search shortcut to option space
# set alfred shortcut to command space

# set pinned chrome tabs & login to chrome

# mac settings
chflags nohidden ~/Library
sudo chflags nohidden /Volumes
defaults write com.apple.finder AppleShowAllFiles YES
defaults write com.apple.finder ShowPathbar -bool true
defaults write com.apple.finder ShowStatusBar -bool true
# Prevent Photos from opening automatically when devices are plugged in
defaults -currentHost write com.apple.ImageCapture disableHotPlug -bool true
# Minimize windows into their application’s icon
defaults write com.apple.dock minimize-to-application -bool true
# set dock autohide to true
osascript -e "tell application \"System Events\" to set the autohide of the dock preferences to true"
# set autohide dock delay and speed
defaults write com.apple.dock autohide-delay -float 0.25
defaults write com.apple.dock autohide-time-modifier -float 0.5
# Bottom left screen corner → Put display to sleep
defaults write com.apple.dock wvous-bl-corner -int 10
# Finder: allow quitting via ⌘ + Q; doing so will also hide desktop icons
defaults write com.apple.finder QuitMenuItem -bool true
# Keep folders on top when sorting by name
defaults write com.apple.finder _FXSortFoldersFirst -bool true
# When performing a search, search the current folder by default
defaults write com.apple.finder FXDefaultSearchScope -string "SCcf"
# Disable the warning when changing a file extension
defaults write com.apple.finder FXEnableExtensionChangeWarning -bool false
# Use list view in all Finder windows by default
# Four-letter codes for the other view modes: `icnv`, `clmv`, `Flwv`
defaults write com.apple.finder FXPreferredViewStyle -string "Nlsv"
# Require password 5 seconds after sleep or screen saver begins
defaults write com.apple.screensaver askForPassword -int 1
defaults write com.apple.screensaver askForPasswordDelay -int 5
# Save screenshots to the desktop
defaults write com.apple.screencapture location -string "${HOME}/Desktop"
# Save screenshots in PNG format (other options: BMP, GIF, JPG, PDF, TIFF)
defaults write com.apple.screencapture type -string "png"
# Disable “natural” (Lion-style) scrolling
defaults write NSGlobalDomain com.apple.swipescrolldirection -bool false
# TODO: organize the dock applications and layout
