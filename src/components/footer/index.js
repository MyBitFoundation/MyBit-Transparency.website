import { h, Component } from 'preact';
import { Container, Grid, Inner, Cell, Wrapper } from '../layout';
import List from 'preact-material-components/List';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/List/style.css';
import facebook from '../../assets/svgs/facebook.svg'
import medium from '../../assets/svgs/medium.svg'
import reddit from '../../assets/svgs/reddit.svg'
import twitter from '../../assets/svgs/twitter.svg'
import telegram from '../../assets/svgs/telegram.svg'
import mybit from '../../assets/svgs/mybit_logo_gray.svg'
import breakpoints, { defaultBreakpoints }  from 'styled-components-breakpoints'
import year from 'year'
import styled from 'styled-components';

const media = breakpoints(defaultBreakpoints)

const ListItem = styled(List.Item)`
  height: 36px;
  ${media.minWidth('s')`
    justify-content: center;
  `}
  ${ props => props.center ? 'justify-content: center;' : ''}
  ${ props => props.block ? 'display: block;' : ''}
`

const Paragraph = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  font-size: 16px;
  text-align: center;
`

const FooterButton = styled.a`
  background-color: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  height: 32px;
  padding: 10px 20px;
  margin: 10px 0;
`

const Spacer = styled.div`
  display: block;
  content: ' ';
  margin: 16px;
`

const FooterHeader = styled.span`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  line-height: 16px;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: block;
`

const SocialListItem = styled(ListItem)`
  display: inline-block;
`

const SocialIcon = styled.img`
  display: inline-block;
  margin: 8px 4px;
`

const FooterList = styled(List)`
  padding-top: 0;
  padding-bottom: 0;
`

const SocialFooterList = styled(FooterList)`
  text-align: center;
`

const socialIcons = [ telegram, reddit, medium, twitter, facebook ]

const Footer = () => {
  const dynamicYear = year() || '2019'
  return (
    <Container footer>
      <Grid slim>
        <Inner>
          <Cell phoneCols="2" desktopCols="3">
            <FooterList>
                <ListItem><FooterHeader>About MyBit</FooterHeader></ListItem>
                <ListItem>Company</ListItem>
                <ListItem>Token</ListItem>
                <ListItem>Blog</ListItem>
                <ListItem>Contact</ListItem>
            </FooterList>
          </Cell>
          <Cell phoneCols="2" desktopCols="3">
            <FooterList>
                <ListItem><FooterHeader>Products</FooterHeader></ListItem>
                <ListItem>SDK</ListItem>
                <ListItem>MyBit Go</ListItem>
                <ListItem>MyBit DDF</ListItem>
                <ListItem>Other dApps</ListItem>
            </FooterList>
          </Cell>
          <Cell phoneCols="4" tabletCols="8" desktopCols="3">
            <SocialFooterList>
              <ListItem center><FooterHeader>Follow Us</FooterHeader></ListItem>
              {
                socialIcons.map( icon => 
                  <SocialListItem><SocialIcon src={icon} /></SocialListItem>)
              }
              <Spacer />
              <ListItem center><FooterHeader>Token Distribution</FooterHeader></ListItem>
            </SocialFooterList>
            <Spacer />
            <Wrapper center>
              <FooterButton unelevated>Contribute</FooterButton>
            </Wrapper>
          </Cell>
          <Cell phoneCols="4" tabletCols="8" desktopCols="3">
            <Wrapper center top>
              <img src={mybit} />
              <Paragraph>
                MyBit Foundation. Dammstrasse 16,<br/>
                6300 Zug, Switzerland.<br/>
                Registration no. CHE-177.186.963
              </Paragraph>
            </Wrapper>
          </Cell>
          <Cell cols="12">
            <Wrapper center>
              <Paragraph>
                Terms & Conditions
              </Paragraph>
              <Paragraph>
                Copyright © MyBit {dynamicYear}.
                All Rights Reserverd.
              </Paragraph>
            </Wrapper>
          </Cell>
        </Inner>
      </Grid>
    </Container>
  )
}

export default Footer;