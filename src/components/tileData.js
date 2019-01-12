import React from 'react'

import {ListItem,ListItemIcon, ListItemText, Tooltip} from '@material-ui/core/'

import {InboxIcon} from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import StarIcon from '@material-ui/icons/Star'
import SendIcon from '@material-ui/icons/Send'
import MailIcon from '@material-ui/icons/Mail'
import DeleteIcon from '@material-ui/icons/Delete'
import ReportIcon from '@material-ui/icons/Report'
import SettingsIcon from '@material-ui/icons/Settings'
import HomeIcon from '@material-ui/icons/Home'

export const mailFolderListItems = (
  <div>
    <Tooltip id="tooltip-home-right" title="Home" placement="top-end">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Nonogram" />
      </ListItem>
    </Tooltip> 
  <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
  <ListItemText primary="Starred" />
    </ListItem >
  <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
  <ListItemText primary="Completed" />
    </ListItem >
  <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
  <ListItemText primary="New" />
    </ListItem >
  </div >
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Feedback" />
    </ListItem>
  </div>
);