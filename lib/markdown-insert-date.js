'use babel';

import MarkdownInsertDateView from './markdown-insert-date-view';
import { CompositeDisposable } from 'atom';

export default {

  markdownInsertDateView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.markdownInsertDateView = new MarkdownInsertDateView(state.markdownInsertDateViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.markdownInsertDateView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'markdown-insert-date:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.markdownInsertDateView.destroy();
  },

  serialize() {
    return {
      markdownInsertDateViewState: this.markdownInsertDateView.serialize()
    };
  },

  toggle() {
    var now = new Date();

    monthString = (now.getMonth() + 1).toString();
    if (monthString.length == 1) {
      // add "0" if monthString has only 1 digit
      monthString = "0" + monthString
    }

    dayString = now.getDate().toString();
    if (dayString.length == 1) {
      // add "0" if dayString has only 1 digit
      dayString = "0" + dayString
    }

    dateString = now.getFullYear() + "." + monthString + "." + dayString;

    // Insert string in the active text editor
    atom.workspace.getActiveTextEditor().insertText(dateString);
  }

};
