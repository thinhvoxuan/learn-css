import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import 'grommet/scss/vanilla/index.scss';
import Button from 'grommet/components/Button';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button primary onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button primary onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
