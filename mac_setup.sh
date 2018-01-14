# how to execute script
# ./mac_setup.sh email@address.com

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
brew cask install visual-studio-code
# brew cask install android-studio
brew cask install firefox
brew cask install google-chrome
brew cask install spectacle
brew cask install vlc
brew cask install slack
brew cask install spotify
brew cask install steam
brew cask install itch
# mas install 497799835 # Xcode

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
curl https://raw.githubusercontent.com/rmkubik/dotfiles/.bash_profile >> ~/.bash_profile
# curl ~/.ssh
# curl ~/.duti
# curl ~/.gitconfig instead or above --global commands?

# nvm doesn't support install through Homebrew
curl x https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
nvm install node

# configure SSH keys

# style the terminal
git clone https://github.com/lysyi3m/osx-terminal-themes
open AdventureTime.terminal # Shell > Use Settings as Default to save

# script for tab completion in git commands
curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash

# mac settings
chflags nohidden ~/Library
defaults write com.apple.finder AppleShowAllFiles YES
defaults write com.apple.finder ShowPathbar -bool true
defaults write com.apple.finder ShowStatusBar -bool true
