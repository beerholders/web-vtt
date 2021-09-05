import Head from 'next/head';
import React, { useReducer, useState } from 'react';
import { merge } from 'lodash';
import { Input } from 'antd';
import { css } from "@emotion/react";

const sheetStyle = css`
html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
}

#player-sheet {
    width: 800px;
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
}

ul {
    margin: 0;
    padding: 0;
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 40px;
}

ul li {
    list-style-image: none;
}

label {
    font-size: 12px;
}

main {
    display: flex;
    justify-content: space-between;
}

textarea {
    font-size: 12px;
    font-family: inherit;
    text-align: left;
    width: calc(100% - 20px - 2px);
    border-radius: 10px;
    padding: 10px;
    resize: none;
    overflow: hidden;
    height: 15em;
    overflow-y: scroll;
}

.box {
    margin-top: 10px;
}

.text-box {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    align-items: center;
}

.list-section {
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    padding: 10px 5px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}

.screen {
    display: none;
    visibility: hidden;
}

.screen.active {
    display: flex;
    visibility: visible;
}

/*
rules for the header
the header contains the character name, class & level, background, race, allignment and xp
*/

header {
    display: flex;
    align-items: stretch;
}

#character-name {
    border: 1px solid var(--cor-das-bordas);
    border-right: 0;
    border-radius: 10px 0 0 10px;
    padding: 5px;
    width: 30%;
    display: flex;
    flex-direction: column-reverse;
    bottom: 0;
    top: 0;
    margin: auto;
}

#character-name label {
    padding-left: 1em;
}

#character-name input {
    padding: 0.5em;
    margin: 5px;
    border: 0;
}

#character-main-info {
    width: 70%;
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    padding-left: 1em;
    padding-right: 1em;
}

#character-main-info ul {
    padding: 10px 0 5px 0;
    display: flex;
    flex-wrap: wrap;
}

#character-main-info ul li {
    width: 33.3333333%;
    display: flex;
    flex-direction: column-reverse;
}

#character-main-info ul li.double-column {
    width: 66.6666666%;
}

#character-main-info ul li label {
    margin-bottom: 5px;
}

#character-main-info ul li input {
    border: 0;
    border-bottom: 1px solid;
}

/*
rules for the navigation menu
*/

#menu {
    margin: 10px 0 10px 0;
}

#menu ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    margin: 0;
    padding: 0;
    border-left: 1px solid rgba(0, 0, 0, .2);
    border-right: 1px solid rgba(255, 255, 255, .1);
}

#menu li {
    display: inline-block;
    list-style-type: none;
    list-style-image: none;
    width: 100%;
    text-align: center;
    margin: 0;
    border: 1px solid var(--cor-das-bordas);
}

#menu li h3 {
    margin: 0;
}

#menu a {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 5px;
    color: currentColor;
    text-decoration: none;
}

/*
rules for the bio
*/

#bio-main {
    flex-direction: column;
}

#bio {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
}

#bio-picture {
    margin: 10px;
}

#bio-picture img {
    width: 300px;
    border-radius: 10px;
}

#bio-text {
    margin: 10px;
    flex: 1;
}

#bio-text textarea {
    height: 300px;
}

#notes {
    display: flex;
    flex-direction: column;
}


/* 
rules for the main character sheet
*/

.outer-section {
    width: 32%;
    display: flex;
    flex-direction: column;
}

/*
rules for the attributes
*/
#attributes {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#att-scores {
    width: 101px;
    border-radius: 10px;
    padding-bottom: 5px;
}

#att-scores ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    margin: 0;
    padding: 0;
}

#att-scores ul li {
    height: 80px;
    width: 70px;
    border: 1px solid var(--cor-das-bordas);
    text-align: center;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: var(--detalhes);
}

.score label {
    font-size: 8px;
    font-weight: bold;
}

.score input {
    width: 100%;
    text-align: center;
    font-size: 40px;
    padding: 2px 0 0 0;
    border: 0;
}

.modifier {
    margin-top: 3px;
}

.modifier input {
    width: 30px;
    height: 20px;
    border: 1px inset var(--cor-das-bordas);
    border-radius: 20px;
    margin: -1px;
    text-align: center;
}

.att-label {
    position: relative;
    width: 100%;
    height: 18px;
    margin-top: 6px;
    border: 1px solid var(--cor-das-bordas);
    border-left: 0;
    text-align: center;
}

.att-label label {
    position: absolute;
    left: 0;
    top: -5px;
    transform: translate(0%, 50%);
    width: 100%;
    font-size: 8px;
}

#inspiration, #proficiency-bonus, #passive-perception {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
}

#inspiration input {
    appearance: none;
    width: 38px;
    height: 28px;
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    order: 1;
}

#inspiration input:checked {
    background-color: var(--checked);
}

#proficiency-bonus input {
    width: 30px;
    height: 28px;
    border: 1px solid var(--cor-das-bordas);
    text-align: center;
    border-radius: 10px;
}

.list-section ul {
    margin: 0;
    padding: 0;
}

.list-section ul li {
    display: flex;
    align-items: center;
}

.list-section ul li label {
    text-transform: none;
    font-size: 8px;
    text-align: left;
    order: 3;
}

.list-section ul li input[type=text] {
    width: 30px;
    font-size: 12px;
    text-align: center;
    border: 0;
    border-bottom: 1px solid var(--cor-das-bordas);
    order: 2;
}

.list-section ul li input[type=checkbox] {
    appearance: none;
    width: 10px;
    height: 10px;
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    order: 1;
}

.list-section ul li input[type=checkbox]:checked {
    background-color: var(--checked);
}

.list-section .label {
    margin-top: 10px;
    margin-bottom: 3px;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
}

#passive-perception input {
    width: 30px;
    height: 28px;
    text-align: center;
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
}

.text-box label {
    text-align: center;
    border: 1px solid var(--cor-das-bordas);
    border-top: 0;
    font-size: 10px;
    width: calc(100% - 20px - 2px);
    border-radius: 0 0 10px 10px;
    padding: 4px 0;
    font-weight: bold;
}

.text-box textarea {
    border: 1px solid var(--cor-das-bordas);
}

#other-profs textarea {
    height: 26em;
}

/*
rules for the physical attributes section
*/
#physical-attr {
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
}

#physical-attr div {
    overflow: hidden;
}

#physical-attr .ac-init-speed {
    flex-basis: 33.33333%;
}

#physical-attr .ac-init-speed div {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 10px;
}

#physical-attr .ac-init-speed div label {
    font-size: 8px;
    width: 50px;
    border: 1px solid var(--cor-das-bordas);
    border-top: 0;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 0 0 10px 10px;
    background-color: var(--detalhes);
}

#physical-attr .ac-init-speed div input {
    height: 70px;
    width: 70px;
    border-radius: 10px;
    border: 1px solid var(--cor-das-bordas);
    text-align: center;
    font-size: 30px;
}

#physical-attr .hp {
    flex-basis: 100%;
}

#physical-attr .hp .regular-hp {
    border: 1px solid var(--cor-das-bordas);
    margin: 10px 10px 5px;
    border-radius: 10px 10px 0 0;
    background-color: var(--detalhes);
}

#physical-attr .hp .regular-hp .max-hp {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
}

#physical-attr .hp .regular-hp .max-hp label {
    font-size: 10px;
    text-transform: none;
}

#physical-attr .hp .regular-hp .max-hp input {
    width: 40%;
    border: 0;
    border-bottom: 1px solid var(--cor-das-bordas);
    font-size: 12px;
    text-align: center;
}

#physical-attr .hp .regular-hp .current-hp {
    display: flex;
    flex-direction: column-reverse;
}

#physical-attr .hp .regular-hp .current-hp label {
    font-size: 10px;
    padding-bottom: 5px;
    text-align: center;
    font-weight: bold;
}

#physical-attr .hp .regular-hp .current-hp input {
    border: 0;
    width: 100%;
    padding: 1em 0;
    font-size: 20px;
    text-align: center;
}

#physical-attr .hp .temporary-hp {
    margin: 0 10px 10px;
    border: 1px solid var(--cor-das-bordas);
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column-reverse;
    background-color: var(--detalhes);
}

#physical-attr .hp .temporary-hp label {
    font-size: 10px;
    padding-bottom: 5px;
    text-align: center;
    font-weight: bold;
}

#physical-attr .hp .temporary-hp input {
    padding: 1em 0;
    font-size: 20px;
    border: 0;
    text-align: center;
}

#physical-attr .hitdice {
    flex: 1 50%;
    height: 100px;
}

#physical-attr .hitdice .hd-ds {
    margin: 10px;
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 80px;
    background-color: var(--detalhes);
}

#physical-attr .hitdice .hd-ds .total {
    display: flex;
    align-items: baseline;
    justify-content: space-around;
    padding: 5px 0;
}

#physical-attr .hitdice .hd-ds .total label {
    font-size: 10px;
    margin: 0.25em;
    text-transform: none;
}

#physical-attr .hitdice .hd-ds .total input {
    font-size: 12px;
    flex-grow: 1;
    border: 0;
    border-bottom: 1px solid var(--cor-das-bordas);
    width: 50%;
    margin-right: 0.25em;
    padding: 0 0.25em;
    text-align: center;
}

#physical-attr .hitdice .hd-ds .remaining {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
}

#physical-attr .hitdice .hd-ds .remaining label{
    text-align: center;
    padding: 2px;
    font-size: 10px;
}

#physical-attr .hitdice .hd-ds .remaining input {
    text-align: center;
    border: 0;
    flex: 1;
}

#physical-attr .death-save {
    flex: 1 50%;
    height: 100px;
}

#physical-attr .death-save .hd-ds {
    margin: 10px;
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    display: flex;
    flex-direction: column-reverse;
    height: 80px;
    background-color: var(--detalhes);
}

#physical-attr .death-save .hd-ds .label {
    text-align: center;
}

#physical-attr .death-save .hd-ds .label label{
    font-size: 10px;
}

#physical-attr .death-save .hd-ds .marks {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
}

#physical-attr .death-save .hd-ds .marks .ds {
    display: flex;
    align-items: center;
}

#physical-attr .death-save .hd-ds .marks .ds label{
    font-size: 8px;
    text-align: right;
    flex: 1 50%;
}

#physical-attr .death-save .hd-ds .marks .ds .ds-check {
    flex: 1 40%;
    margin-left: 5px;
}

#physical-attr .death-save .hd-ds .marks .ds .ds-check input[type=checkbox] {
    appearance: none;
    width: 10px;
    height: 10px;
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    cursor: pointer;
    margin: 0;
}

#physical-attr .death-save .hd-ds .marks .ds .ds-check input[type=checkbox]:checked {
    background-color: var(--checked);
}


/*
rules for attacks and spellcasting
*/
#attacks-and-spellcasting {
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    margin-top: 10px;
    background-color: var(--cor-dos-frames);
}

#attacks-and-spellcasting div {
    margin: 10px;
    display: flex;
    flex-direction: column;
}

#attacks-and-spellcasting div label {
    order: 3;
    text-align: center;
}

#attacks-and-spellcasting div table th {
    font-size: 10px;
}

#attacks-and-spellcasting div table input {
    width: calc(100% - 4px);
    border: 0;
    font-size: 10px;
    padding: 3px;
}

#attacks-and-spellcasting div textarea {
    border: 0;
}

.equipment {
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    margin-top: 10px;
    background-color: var(--cor-dos-frames);
}

.equipment > div {
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.equipment > div label {
    order: 3;
    text-align: center;
    flex: 100%;
}

.equipment > div .money ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin: 0;
    padding: 0;
}

.equipment > div .money ul li {
    display: flex;
    align-items: center;
}

.equipment > div .money ul li label {
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px 0 0 10px;
    border-right: 0;
    width: 0;
    font-size: 8px;
    text-align: center;
    padding: 3px 0;
    order: 0;
}

.equipment > div .money ul li input {
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    width: 60px;
    padding: 10px 3px;
    font-size: 12px;
    text-align: center;
}

.equipment > div table {
    flex: 1;
    border: 0;
    margin: 0 15px;
}

tbody {
    vertical-align: top;
}

.equipment > div table input {
    width: calc(100% - 4px);
    border: 0;
    font-size: 10px;
    padding: 3px;
}

/*
traits
*/
#traits {
    padding: 10px;
    border-radius: 10px;
}

#traits div:first-child {
    border-radius: 10px 10px 0 0;
}

#traits div:not(:first-child) {
    margin-top: 10px;
}

#traits div:last-child {
    border-radius: 0 0 10px 10px;
}

#traits div {
    display: flex;
    flex-direction: column-reverse;
    padding: 5px;
    border: 1px solid var(--cor-das-bordas);
}

#traits div label {
    text-align: center;
    font-size: 10px;
    margin-top: 3px;
}

#traits div textarea {
    border: 0;
    border-radius: 0;
    height: 4em;
}

#features {
    padding: 10px;
}

#features div {
    background-color: var(--cor-dos-frames);
    padding: 10px;
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    display: flex;
    flex-direction: column-reverse;
}

#features div label {
    text-align: center;
}

#features div textarea {
    border: 0;
    padding: 5px;
    height: 43em;
}

#character-name, #att-scores, #physical-attr, #traits div{
    background-color: var(--cor-dos-frames);
}

/*
rules for the spellcasting section
*/

#spells-main {
    flex-direction: column;
}

#spells-header, #spells-section {
    border: 1px solid var(--cor-das-bordas);
    border-radius: 10px;
    padding-left: 1em;
    padding-right: 1em;
    width: calc(800px - 2em);
}

#spells-header ul {
    display: flex;
    justify-content: space-between;
    padding: 0;
}

#spells-header ul li {
    width: 180px;
    display: flex;
    flex-direction: column-reverse;
}

#spells-header ul li label {
    margin-top: 5px;
    text-align: center;
}

#spells-header ul li input,select {
    border-radius: 10px;
    border: 1px solid var(--cor-das-bordas);
    text-align: center;
    font-size: 30px;
}

#spells-section {
    display: grid;
    grid-template-columns: 250px 250px 250px;
    grid-template-rows: 250px 250px 250px 250px;
    justify-content: space-between;
}

#spells-section section {
    margin: 1em 0 1em 0;
}

#spells-section table {
    width: 100%;
    height: 100%;
    border: 1px solid var(--cor-das-bordas);
}
`

function getScoreModifier(score, level, proficiency) {
  console.log(score);
  console.log(level);
  console.log(proficiency);
  const proficiencyBonus = proficiency ? getProficiencyModifier(level) : 0;
  return Math.floor((score - 10)/2) + proficiencyBonus;
}

function getProficiencyModifier(level) {
  return Math.ceil((level/4) + 1);
}

function handleClassAndLevelChange(classAndLevel, onChange) {
  const classAndLevelArr = classAndLevel.split(" ");
  const characterLevel = classAndLevelArr.pop();
  const characterClass = classAndLevelArr.join(" ");
  onChange({class: characterClass, level: characterLevel});
}

let bioInfo = {
  img: './img/Praestes.png',
  bio: 'O BeeHolder é uma criatura lendária.',
  notes: 'Ele tem a capacidade de segurar abelhas, ou cervejas, a depender do humor dele.'
}

let characterInfo = {
  name: 'Praestes Solis',
  class: 'Cleric',
  level: 7,
  background: 'Acolyte',
  race: 'Half-Elf',
  alignment: 'Lawful Neutral',
  xp: 0,
  traits: {
    personality: "I believe that anything worth doing is worth doing right. I can't help it- I'm a perfectionist.",
    ideals: "Generosity. My talents were given to me so that I could use them to benefit the world.",
    bonds: "I created a great work for someone, and then found them unworthy to receive it. I'm still looking for someone worthy.",
    flaws: "I'm never satisfied with what I have- I always want more."
  },
  attributes: {
    scores: {
      str: {
        value: 8,
        proficiency: false
      },
      dex: {
        value:12,
        proficiency: false
      },
      con: {
        value:15,
        proficiency: false
      },
      int: {
        value:14,
        proficiency: true
      },
      wis: {
        value:18,
        proficiency: true
      },
      cha: {
        value:12,
        proficiency: false
      },
    },
    AC: 16,
    speed: 30,
    max_hp: 44,
    current_hp: 44,
    temporary_hp: 0,
    inspiration: true,
    skills_proficiency: {
      acrobatics: true,
      animal_handling: false,
      arcana: true,
      athletics: false,
      deception: false,
      history: true,
      insight: false,
      intimidation: false,
      medicine: true,
      nature: false,
      perception: false,
      performance: false,
      persuasion: false,
      religion: true,
      sleigth_of_hand: false,
      stealth: false,
      survival: false
    }
  },
  attacks_and_spellcasting: [
    {
      name: 'Mace',
      attack_bonus: 'str',
      damage: '1d6',
      type: 'bludgeoning'
    },
    {
      name: 'Shortsword',
      attack_bonus: 'dex',
      damage: '1d6',
      type: 'slashing'
    },
    {
      name: 'Fireball',
      attack_bonus: '0',
      damage: '8d6',
      type: 'fire'
    }
  ],
  equipment: {
    cp: 15,
    sp: 10,
    ep: 0,
    gp: 40,
    pp: 0,
    items: [
      {
        name: 'Mace',
        weight: 4
      },
      {
        name: 'Shortsword',
        weight: 2
      },
      {
        name: 'Chain Mail',
        weight: 55
      }
    ]
  },
  spellcasting: {
    attribute: 'wis',
    features: 'I use my Arcane Focus to cast spells',
    pouch_inventory: [
      'Arcane Focus'
    ],
    cantrips: [
      'Light',
      'Minor Ilussion',
      'Sacred Flame'
    ],
    level_1: [
      'Burning Hands',
      'Cure Wounds',
      'Detect Magic',
      'Faerie Fire'
    ],
    level_2: [
      'Flaming Sphere',
      'Scorching Ray'
    ],
    level_3: [
      'Daylight',
      'Fireball'
    ],
    level_4: [

    ],
    level_5: [

    ],
    level_6: [

    ],
    level_7: [

    ],
    level_8: [

    ],
    level_9: [

    ]
  }
}

let pageSelector = {
  bio: '',
  sheet: 'active',
  spells: ''
}

function SheetHeader({character, onChange}) {
  return (
      <header className={'SheetHeader'}>
        <section id={'character-name'}>
          <label htmlFor='character-name-input'>Character Name</label>
          <Input type="text" id="character-name-input" value={character.name} onChange={(e) => onChange({name: e.target.value})}/>
        </section>
        <section id={'character-main-info'}>
          <ul>
            <li class='double-column'>
              <label htmlFor='class-and-level-input'>Class & Level</label>
              <Input type='text' id='class-and-level-input' value={character.class + ' ' + character.level} onChange={(e) => handleClassAndLevelChange(e.target.value, onChange)}/>
            </li>
            <li>
              <label htmlFor='background-input'>Background</label>
              <Input type='text' id='background-input' value={character.background} onChange={(e) => onChange({background: e.target.value})}/>
            </li>
            <li>
              <label htmlFor='race-input'>Race</label>
              <Input type='text' id='race-input' value={character.race} onChange={(e) => onChange({race: e.target.value})}/>
            </li>
            <li>
              <label htmlFor='alignment-input'>Alignment</label>
              <Input type='text' id='alignment-input' value={character.alignment} onChange={(e) => onChange({alignment: e.target.value})}/>
            </li>
            <li>
              <label htmlFor='xp-input'>Experience Points</label>
              <Input type='text' id='xp-input' value={character.xp} onChange={(e) => onChange({xp: e.target.value})}/>
            </li>
          </ul>
        </section>
      </header>
  );
}

function SheetMenu({onChange}) {
  return (
      <nav id="menu">
        <ul>
          <li><a onClick={e => onChange({bio: 'active', sheet: '', spells: ''})}><h3>Bio & Notes</h3></a></li>
          <li><a onClick={e => onChange({bio: '', sheet: 'active', spells: ''})}><h3>Sheet</h3></a></li>
          <li><a onClick={e => onChange({bio: '', sheet: '', spells: 'active'})}><h3>Spells</h3></a></li>
        </ul>
      </nav>
  );
}

function Bio({bio, page, onChange}) {
  return (
      <main id="bio-main" class={`screen ${page.bio}`}>
        <section id="bio">
          <section id="bio-picture">
            <img src={bio.img} alt="Foto do personagem"/>
          </section>
          <section id="bio-text">
            <textarea value={bio.bio} onChange={(e) => onChange({bio: e.target.value})}/>
          </section>
        </section>
        <section id="notes">
          <h3>Notes</h3>
          <textarea value={bio.notes} onChange={(e) => onChange({notes: e.target.value})}/>
        </section>
      </main>
  )
}

function Sheet({character, page, onChange}) {
  return (
      <main id="sheet-main" class={`screen ${page.sheet}`}>
        <section class="outer-section">
          <section id="attributes">
            <section id="att-scores">
              <ul>
                <li>
                  <div class="score">
                    <label htmlFor="str-score-input">Strength</label>
                    <Input type="number" id="str-score-input" value={character.attributes.scores.str.value} onChange={(e) => onChange({attributes: {scores: {str: {value: e.target.value}}}})}/>
                  </div>
                  <div class="modifier">
                    <input type="text" id="str-mod-input" value={getScoreModifier(character.attributes.scores.str.value, character.level)} class="str-mod" readonly/>
                  </div>
                </li>
                <li>
                  <div class="score">
                    <label htmlFor="dex-score-input">Dexterity</label>
                    <Input type="number" id="dex-score-input" value={character.attributes.scores.dex.value} onChange={(e) => onChange({attributes: {scores: {dex: {value: e.target.value}}}})}/>
                  </div>
                  <div class="modifier">
                    <input type="text" id="dex-mod-input" value={getScoreModifier(character.attributes.scores.dex.value, character.level)} class="dex-mod" readonly/>
                  </div>
                </li>
                <li>
                  <div class="score">
                    <label htmlFor="con-score-input">Constitution</label>
                    <Input type="number" id="con-score-input" value={character.attributes.scores.con.value} onChange={(e) => onChange({attributes: {scores: {con: {value: e.target.value}}}})}/>
                  </div>
                  <div class="modifier">
                    <input type="text" id="con-mod-input" value={getScoreModifier(character.attributes.scores.con.value, character.level)} class="con-mod" readonly/>
                  </div>
                </li>
                <li>
                  <div class="score">
                    <label htmlFor="int-score-input">Intelligence</label>
                    <Input type="number" id="int-score-input" value={character.attributes.scores.int.value} onChange={(e) => onChange({attributes: {scores: {int: {value: e.target.value}}}})}/>
                  </div>
                  <div class="modifier">
                    <input type="text" id="int-mod-input" value={getScoreModifier(character.attributes.scores.int.value, character.level)} class="int-mod" readonly/>
                  </div>
                </li>
                <li>
                  <div class="score">
                    <label htmlFor="wis-score-input">Wisdom</label>
                    <Input type="number" id="wis-score-input" value={character.attributes.scores.wis.value} onChange={(e) => onChange({attributes: {scores: {wis: {value: e.target.value}}}})}/>
                  </div>
                  <div class="modifier">
                    <input type="text" id="wis-mod-input" value={getScoreModifier(character.attributes.scores.wis.value, character.level)} class="wis-mod" readonly/>
                  </div>
                </li>
                <li>
                  <div class="score">
                    <label htmlFor="cha-score-input">Charisma</label>
                    <Input type="number" id="cha-score-input" value={character.attributes.scores.cha.value} onChange={(e) => onChange({attributes: {scores: {cha: {value: e.target.value}}}})}/>
                  </div>
                  <div class="modifier">
                    <input type="text" id="cha-mod-input" value={getScoreModifier(character.attributes.scores.cha.value, character.level)} class="cha-mod" readonly/>
                  </div>
                </li>
              </ul>
            </section>
            <section id="att-misc">
              <div id="inspiration" class="box">
                <div class="att-label">
                  <label htmlFor="inspiration-input">Inspiration</label>
                </div>
                <Input type="checkbox" id="inspiration-input" checked={character.attributes.inspiration} onChange={(e) => {onChange({attributes: {inspiration: e.target.checked}})}}/>
              </div>
              <div id="proficiency-bonus" class="box">
                <div class="att-label">
                  <label htmlFor="proficiency-bonus-input">Proficiency Bonus</label>
                </div>
                <input type="text" id="proficiency-bonus-input" value={getProficiencyModifier(character.level)} readonly/>
              </div>
              <div id="saves" class="box list-section">
                <ul>
                  <li>
                    <label htmlFor="str-save-input">Strength</label>
                    <Input type="text" id="str-save-input" class="str-mod" value={getScoreModifier(character.attributes.scores.str.value, character.level, character.attributes.scores.str.proficiency)}/>
                    <Input type="checkbox" id="str-save-prof" checked={character.attributes.scores.str.proficiency} onChange={(e) => onChange({attributes: {scores: {str: {proficiency: e.target.checked}}}})}/>
                  </li>
                  <li>
                    <label htmlFor="dex-save-input">Dexterity</label>
                    <Input type="text" id="dex-save-input" class="dex-mod" value={getScoreModifier(character.attributes.scores.dex.value, character.level, character.attributes.scores.dex.proficiency)}/>
                    <Input type="checkbox" id="dex-save-prof" checked={character.attributes.scores.dex.proficiency} onChange={(e) => onChange({attributes: {scores: {dex: {proficiency: e.target.checked}}}})}/>
                  </li>
                  <li>
                    <label htmlFor="con-save-input">Constitution</label>
                    <Input type="text" id="con-save-input" class="con-mod" value={getScoreModifier(character.attributes.scores.con.value, character.level, character.attributes.scores.con.proficiency)}/>
                    <Input type="checkbox" id="con-save-prof" checked={character.attributes.scores.con.proficiency} onChange={(e) => onChange({attributes: {scores: {con: {proficiency: e.target.checked}}}})}/>
                  </li>
                  <li>
                    <label htmlFor="int-save-input">Intelligence</label>
                    <Input type="text" id="int-save-input" class="int-mod" value={getScoreModifier(character.attributes.scores.int.value, character.level, character.attributes.scores.int.proficiency)}/>
                    <Input type="checkbox" id="int-save-prof" checked={character.attributes.scores.int.proficiency} onChange={(e) => onChange({attributes: {scores: {int: {proficiency: e.target.checked}}}})}/>
                  </li>
                  <li>
                    <label htmlFor="wis-save-input">Wisdom</label>
                    <Input type="text" id="wis-save-input" class="wis-mod" value={getScoreModifier(character.attributes.scores.wis.value, character.level, character.attributes.scores.wis.proficiency)}/>
                    <Input type="checkbox" id="wis-save-prof" checked={character.attributes.scores.wis.proficiency} onChange={(e) => onChange({attributes: {scores: {wis: {proficiency: e.target.checked}}}})}/>
                  </li>
                  <li>
                    <label htmlFor="cha-save-input">Charisma</label>
                    <Input type="text" id="cha-save-input" class="cha-mod" value={getScoreModifier(character.attributes.scores.cha.value, character.level, character.attributes.scores.cha.proficiency)}/>
                    <Input type="checkbox" id="cha-save-prof" checked={character.attributes.scores.cha.proficiency} onChange={(e) => onChange({attributes: {scores: {cha: {proficiency: e.target.checked}}}})}/>
                  </li>
                </ul>
                <div class="label">Saving Throws</div>
              </div>
              <div id="skills" class="box list-section">
                <ul>
                  <li>
                    <label htmlFor="acrobatics">Acrobatis <span class="skill-span">(Dex)</span></label>
                    <Input type="text" id="acrobatics" class="dex-mod" value={getScoreModifier(character.attributes.scores.dex.value, character.level, character.attributes.skills_proficiency.acrobatics)} readonly/>
                    <Input type="checkbox" id="acrobatics-prof" checked={character.attributes.skills_proficiency.acrobatics} onChange={(e) => {onChange({attributes: { skills_proficiency: {acrobatics: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="animal-handling">Animal Handling <span class="skill-span">(Wis)</span></label>
                    <Input type="text" id="animal-handling" class="wis-mod" value={getScoreModifier(character.attributes.scores.wis.value, character.level, character.attributes.skills_proficiency.animal_handling)} readonly/>
                    <Input type="checkbox" id="animal-handling-prof" checked={character.attributes.skills_proficiency.animal_handling} onChange={(e) => {onChange({attributes: { skills_proficiency: {animal_handling: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="arcana">Arcana <span class="skill-span">(Int)</span></label>
                    <Input type="text" id="arcana" class="int-mod" value={getScoreModifier(character.attributes.scores.int.value, character.level, character.attributes.skills_proficiency.arcana)} readonly/>
                    <Input type="checkbox" id="arcana-prof" checked={character.attributes.skills_proficiency.arcana} onChange={(e) => {onChange({attributes: { skills_proficiency: {arcana: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="athletics">Athletics <span class="skill-span">(Str)</span></label>
                    <Input type="text" id="athletics" class="str-mod" value={getScoreModifier(character.attributes.scores.str.value, character.level, character.attributes.skills_proficiency.athletics)} readonly/>
                    <Input type="checkbox" id="athletics-prof" checked={character.attributes.skills_proficiency.athletics} onChange={(e) => {onChange({attributes: { skills_proficiency: {athletics: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="deception">Deception <span class="skill-span">(Cha)</span></label>
                    <Input type="text" id="deception" class="cha-mod" value={getScoreModifier(character.attributes.scores.cha.value, character.level, character.attributes.skills_proficiency.deception)} readonly/>
                    <Input type="checkbox" id="deception-prof" checked={character.attributes.skills_proficiency.deception} onChange={(e) => {onChange({attributes: { skills_proficiency: {deception: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="history">History <span class="skill-span">(Int)</span></label>
                    <Input type="text" id="history" class="int-mod" value={getScoreModifier(character.attributes.scores.int.value, character.level, character.attributes.skills_proficiency.history)} readonly/>
                    <Input type="checkbox" id="history-prof" checked={character.attributes.skills_proficiency.history} onChange={(e) => {onChange({attributes: { skills_proficiency: {history: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="insight">Insight <span class="skill-span">(Wis)</span></label>
                    <Input type="text" id="insight" class="wis-mod" value={getScoreModifier(character.attributes.scores.wis.value, character.level, character.attributes.skills_proficiency.insight)} readonly/>
                    <Input type="checkbox" id="insight-prof" checked={character.attributes.skills_proficiency.insight} onChange={(e) => {onChange({attributes: { skills_proficiency: {insight: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="intimidation">Intimidation <span class="skill-span">(Cha)</span></label>
                    <Input type="text" id="intimidation" class="cha-mod" value={getScoreModifier(character.attributes.scores.cha.value, character.level, character.attributes.skills_proficiency.intimidation)} readonly/>
                    <Input type="checkbox" id="intimidation-prof" checked={character.attributes.skills_proficiency.intimidation} onChange={(e) => {onChange({attributes: { skills_proficiency: {intimidation: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="medicine">Medicine <span class="skill-span">(Wis)</span></label>
                    <Input type="text" id="medicine" class="wis-mod" value={getScoreModifier(character.attributes.scores.wis.value, character.level, character.attributes.skills_proficiency.medicine)} readonly/>
                    <Input type="checkbox" id="medicine-prof" checked={character.attributes.skills_proficiency.medicine} onChange={(e) => {onChange({attributes: { skills_proficiency: {medicine: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="nature">Nature <span class="skill-span">(Int)</span></label>
                    <Input type="text" id="nature" class="int-mod" value={getScoreModifier(character.attributes.scores.int.value, character.level, character.attributes.skills_proficiency.nature)} readonly/>
                    <Input type="checkbox" id="nature-prof" checked={character.attributes.skills_proficiency.nature} onChange={(e) => {onChange({attributes: { skills_proficiency: {nature: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="perception">Perception <span class="skill-span">(Wis)</span></label>
                    <Input type="text" id="perception" class="wis-mod" value={getScoreModifier(character.attributes.scores.wis.value, character.level, character.attributes.skills_proficiency.perception)} readonly/>
                    <Input type="checkbox" id="perception-prof" checked={character.attributes.skills_proficiency.perception} onChange={(e) => {onChange({attributes: { skills_proficiency: {perception: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="performance">Performance <span class="skill-span">(Cha)</span></label>
                    <Input type="text" id="performance" class="cha-mod" value={getScoreModifier(character.attributes.scores.cha.value, character.level, character.attributes.skills_proficiency.performance)} readonly/>
                    <Input type="checkbox" id="performance-prof" checked={character.attributes.skills_proficiency.performance} onChange={(e) => {onChange({attributes: { skills_proficiency: {performance: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="persuasion">Persuasion <span class="skill-span">(Cha)</span></label>
                    <Input type="text" id="persuasion" class="cha-mod" value={getScoreModifier(character.attributes.scores.cha.value, character.level, character.attributes.skills_proficiency.persuasion)} readonly/>
                    <Input type="checkbox" id="persuasion-prof" checked={character.attributes.skills_proficiency.persuasion} onChange={(e) => {onChange({attributes: { skills_proficiency: {persuasion: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="religion">Religion <span class="skill-span">(Int)</span></label>
                    <Input type="text" id="religion" class="int-mod" value={getScoreModifier(character.attributes.scores.int.value, character.level, character.attributes.skills_proficiency.religion)} readonly/>
                    <Input type="checkbox" id="religion-prof" checked={character.attributes.skills_proficiency.religion} onChange={(e) => {onChange({attributes: { skills_proficiency: {religion: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="sleight-of-hand">Sleight of Hand <span class="skill-span">(Dex)</span></label>
                    <Input type="text" id="sleight-of-hand" class="dex-mod" value={getScoreModifier(character.attributes.scores.dex.value, character.level, character.attributes.skills_proficiency.sleigth_of_hand)} readonly/>
                    <Input type="checkbox" id="sleight-of-hand-prof" checked={character.attributes.skills_proficiency.sleigth_of_hand} onChange={(e) => {onChange({attributes: { skills_proficiency: {sleigth_of_hand: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="stealth">Stealth <span class="skill-span">(Dex)</span></label>
                    <Input type="text" id="stealth" class="dex-mod" value={getScoreModifier(character.attributes.scores.dex.value, character.level, character.attributes.skills_proficiency.stealth)} readonly/>
                    <Input type="checkbox" id="stealth-prof" checked={character.attributes.skills_proficiency.stealth} onChange={(e) => {onChange({attributes: { skills_proficiency: {stealth: e.target.checked}}})}}/>
                  </li>
                  <li>
                    <label htmlFor="survival">Survival <span class="skill-span">(Wis)</span></label>
                    <Input type="text" id="survival" class="wis-mod" value={getScoreModifier(character.attributes.scores.wis.value, character.level, character.attributes.skills_proficiency.survival)} readonly/>
                    <Input type="checkbox" id="survival-prof" checked={character.attributes.skills_proficiency.survival} onChange={(e) => {onChange({attributes: { skills_proficiency: {survival: e.target.checked}}})}}/>
                  </li>
                </ul>
                <div class="label">Skills</div>
              </div>
            </section>
          </section>
          <section id="passive-perception" class="box">
            <div class="att-label">
              <label htmlFor="passive-perception">Passive Wisdom (Perception)</label>
            </div>
            <Input type="number" id="passive-perception-input" class="wis-mod" value={10 + getScoreModifier(character.attributes.scores.wis.value, character.level)} readonly/>
          </section>
          <section id="other-profs" class="box text-box">
            <label htmlFor="other-profs-input">Other Proficiences and Languages</label>
            <textarea id="other-profs-input"></textarea>
          </section>
        </section>
        <section class="outer-section">
          <section id="physical-attr">
            <div class="armor-class ac-init-speed">
              <div>
                <label htmlFor="armor-class-input">Armor Class</label>
                <Input type="number" id="armor-class-input" value={character.attributes.AC}/>
              </div>
            </div>
            <div class="initiative ac-init-speed">
              <div>
                <label htmlFor="initiative-input">Initiative</label>
                <Input type="number" id="initiative-input" class="dex-mod" value={getScoreModifier(character.attributes.scores.dex.value, character.level)}/>
              </div>
            </div>
            <div class="speed ac-init-speed">
              <div>
                <label htmlFor="speed-input">Speed</label>
                <Input type="number" id="speed-input" value={character.attributes.speed}/>
              </div>
            </div>
            <div class="hp">
              <div class="regular-hp">
                <div class="max-hp">
                  <label htmlFor="max-hp-input">Hit Point Maximum</label>
                  <Input type="number" id="max-hp-input" value={character.attributes.max_hp} onChange={(e) => onChange({attributes: {max_hp: e.target.value}})}/>
                </div>
                <div class="current-hp">
                  <label htmlFor="current-hp-input">Current Hit Points</label>
                  <Input type="number" id="current-hp-input" value={character.attributes.current_hp} onChange={(e) => onChange({attributes: {current_hp: e.target.value}})}/>
                </div>
              </div>
              <div class="temporary-hp">
                <label htmlFor="temporary-hp-input">Temporary Hit Points</label>
                <Input type="number" id="temporary-hp-input" value={character.attributes.temporary_hp} onChange={(e) => onChange({attributes: {temporary_hp: e.target.value}})}/>
              </div>
            </div>
            <div class="hitdice">
              <div class="hd-ds">
                <div class="total">
                  <label htmlFor="total-hd">Total</label>
                  <Input type="number" id="total-hd" value={character.level}/>
                </div>
                <div class="remaining">
                  <label htmlFor="remaining-hd">Hit Dice</label>
                  <Input type="text" id="remaining-hd"/>
                </div>
              </div>
            </div>
            <div class="death-save">
              <div class="hd-ds">
                <div class="label">
                  <label>Death Saves</label>
                </div>
                <div class="marks">
                  <div class="ds ds-successes">
                    <label>Successes</label>
                    <div class="ds-check">
                      <Input type="checkbox" name="ds-success1"/>
                      <Input type="checkbox" name="ds-success2"/>
                      <Input type="checkbox" name="ds-success3"/>
                    </div>
                  </div>
                  <div class="ds ds-failures">
                    <label>Failures</label>
                    <div class="ds-check">
                      <Input type="checkbox" name="ds-success1"/>
                      <Input type="checkbox" name="ds-success2"/>
                      <Input type="checkbox" name="ds-success3"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="attacks-and-spellcasting">
            <div>
              <label>Attacks & Spellcasting</label>
              <table>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Attack Bonus</th>
                  <th>Damage/Type</th>
                </tr>
                </thead>
                <tbody>
                {character.attacks_and_spellcasting.map((item) => (
                    <tr>
                      <td><Input type="text" value={item.name}/></td>
                      <td><Input type="text" value={getScoreModifier(character.attributes.scores[item.attack_bonus], character.level) || ''}/></td>
                      <td><Input type="text" value={item.damage + ' ' + item.type}/></td>
                    </tr>
                ))}
                </tbody>
              </table>
              <textarea></textarea>
            </div>
          </section>
          <section class="equipment">
            <div>
              <label>Equipment</label>
              <div class="money">
                <ul>
                  <li>
                    <label htmlFor="cp">cp</label>
                    <Input type="number" id="cp" value={character.equipment.cp} onChange={(e) => onChange({equipment: {cp: e.target.value}})}/>
                  </li>
                  <li>
                    <label htmlFor="sp">sp</label>
                    <Input type="number" id="sp" value={character.equipment.sp} onChange={(e) => onChange({equipment: {sp: e.target.value}})}/>
                  </li>
                  <li>
                    <label htmlFor="ep">ep</label>
                    <Input type="number" id="ep" value={character.equipment.ep} onChange={(e) => onChange({equipment: {ep: e.target.value}})}/>
                  </li>
                  <li>
                    <label htmlFor="gp">gp</label>
                    <Input type="number" id="gp" value={character.equipment.gp} onChange={(e) => onChange({equipment: {gp: e.target.value}})}/>
                  </li>
                  <li>
                    <label htmlFor="pp">pp</label>
                    <Input type="number" id="pp" value={character.equipment.pp} onChange={(e) => onChange({equipment: {pp: e.target.value}})}/>
                  </li>
                </ul>
              </div>
              <table>
                <thead>
                <tr>
                  <th>Item</th>
                  <th>Weight</th>
                </tr>
                </thead>
                <tbody>
                {character.equipment.items.map((item) => (
                    <tr>
                      <td><Input type="text" value={item.name}/></td>
                      <td><Input type="text" value={`${item.weight} lb.`}/></td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
        <section class="outer-section">
          <section id="traits">
            <div id="personality">
              <label htmlFor="personality">Personality</label>
              <textarea name="personality" value={character.traits.personality} onChange={(e) => onChange({traits: {personality: e.target.value}})}></textarea>
            </div>
            <div id="ideals">
              <label htmlFor="ideals">Ideals</label>
              <textarea name="ideals" value={character.traits.ideals} onChange={(e) => onChange({traits: {ideals: e.target.value}})}></textarea>
            </div>
            <div id="bonds">
              <label htmlFor="bonds">Bonds</label>
              <textarea name="bonds" value={character.traits.bonds} onChange={(e) => onChange({traits: {bonds: e.target.value}})}></textarea>
            </div>
            <div id="flaws">
              <label htmlFor="flaws">Flaws</label>
              <textarea name="flaws" value={character.traits.flaws} onChange={(e) => onChange({traits: {flaws: e.target.value}})}></textarea>
            </div>
          </section>
          <section id="features">
            <div>
              <label htmlFor="features">Features & Traits</label>
              <textarea name="features"></textarea>
            </div>
          </section>
        </section>
      </main>
  )
}

function Spells({character, page, onChange}) {
  return (
      <main id="spells-main" class={`screen ${page.spells}`}>
        <section id="spells-header">
          <ul>
            <li>
              <label htmlFor="spellcasting-class-input">Spellcasting Class</label>
              <Input type="text" id="spellcasting-class-input" value={character.class}/>
            </li>
            <li>
              <label htmlFor="spellcasting-ability-input">Spellcasting Ability</label>
              <select name="spellcasting-ability-input" id="spellcasting-ability-input" value={character.spellcasting.attribute} onChange={(e) => onChange({spellcasting: {attribute: e.target.value}})}>
                <option value="str">Strenght</option>
                <option value="dex">Dexterity</option>
                <option value="con">Constitution</option>
                <option value="int">Intelligence</option>
                <option value="wis">Wisdom</option>
                <option value="cha">Charisma</option>
              </select>
            </li>
            <li>
              <label htmlFor="spell-atk-bonus-input">Spell Attack Bonus</label>
              <Input type="text" id="spell-atk-bonus-input" value={getScoreModifier(character.attributes.scores[character.spellcasting.attribute].value, character.level, character.attributes.scores[character.spellcasting.attribute].proficiency)}/>
            </li>
            <li>
              <label htmlFor="spell-save-dc-input">Spell Save DC</label>
              <Input type="text" id="spell-save-dc-input" value={8 + getScoreModifier(character.attributes.scores[character.spellcasting.attribute].value, character.level, character.attributes.scores[character.spellcasting.attribute].proficiency)}/>
            </li>
          </ul>
        </section>
        <section id="spells-section">
          <section id="cantrips">
            <table>
              <thead>
              <tr>
                <th>Cantrips</th>
              </tr>
              </thead>
              <tbody>
              {character.spellcasting.cantrips.map((cantrip) => (
                  <tr>
                    <td><Input type="text" value={cantrip}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
          <section id="spells-features">
            <label htmlFor="spells-features-input">Spellcasting Features</label>
            <textarea id="spells-features-input" value={character.spellcasting.features} onChange={(e) => onChange({spellcasting: {features: e.target.value}})}></textarea>
          </section>
          <section id="spells-material-components">
            <label htmlFor="spells-material-components-input">Component Pouch Inventory</label>
            <table>
              <tbody>
              {character.spellcasting.pouch_inventory.map((item) => (
                  <tr>
                    <td><Input type="text" value={item}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
          <section id="spells-lvl-1">
            <table>
              <thead>
              <tr>
                <th>Level 1</th>
              </tr>
              </thead>
              <tbody>
              {character.spellcasting.level_1.map((spell) => (
                  <tr>
                    <td><Input type="text" value={spell}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
          <section id="spells-lvl-2">
            <table>
              <thead>
              <tr>
                <th>Level 2</th>
              </tr>
              </thead>
              <tbody>
              {character.spellcasting.level_2.map((spell) => (
                  <tr>
                    <td><Input type="text" value={spell}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
          <section id="spells-lvl-3">
            <table>
              <thead>
              <tr>
                <th>Level 3</th>
              </tr>
              </thead>
              <tbody>
              {character.spellcasting.level_3.map((spell) => (
                  <tr>
                    <td><Input type="text" value={spell}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
          <section id="spells-lvl-4">
            <table>
              <thead>
              <tr>
                <th>Level 4</th>
              </tr>
              </thead>
              <tbody>
              {character.spellcasting.level_4.map((spell) => (
                  <tr>
                    <td><Input type="text" value={spell}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
          <section id="spells-lvl-5">
            <table>
              <thead>
              <tr>
                <th>Level 5</th>
              </tr>
              </thead>
              <tbody>
              {character.spellcasting.level_5.map((spell) => (
                  <tr>
                    <td><Input type="text" value={spell}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
          <section id="spells-lvl-6">
            <table>
              <thead>
              <tr>
                <th>Level 6</th>
              </tr>
              </thead>
              <tbody>
              {character.spellcasting.level_6.map((spell) => (
                  <tr>
                    <td><Input type="text" value={spell}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
          <section id="spells-lvl-7">
            <table>
              <thead>
              <tr>
                <th>Level 7</th>
              </tr>
              </thead>
              <tbody>
              {character.spellcasting.level_7.map((spell) => (
                  <tr>
                    <td><Input type="text" value={spell}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
          <section id="spells-lvl-8">
            <table>
              <thead>
              <tr>
                <th>Level 8</th>
              </tr>
              </thead>
              <tbody>
              {character.spellcasting.level_8.map((spell) => (
                  <tr>
                    <td><Input type="text" value={spell}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
          <section id="spells-lvl-9">
            <table>
              <thead>
              <tr>
                <th>Level 9</th>
              </tr>
              </thead>
              <tbody>
              {character.spellcasting.level_9.map((spell) => (
                  <tr>
                    <td><Input type="text" value={spell}/></td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
        </section>
      </main>
  )
}

export default function PlayerSheet() {

  const [page, setPage] = useReducer((currentPage, changes) => {
    return merge({}, currentPage, changes)
  }, pageSelector);

  const [bio, setBio] = useReducer((currentHeader, changes) => {
    return merge({}, currentHeader, changes)
  }, bioInfo);

  const [character, setCharacter] = useReducer((currentCharacter, changes) => {
    return merge({}, currentCharacter, changes)
  }, characterInfo);

  return (
      <html css={sheetStyle}>
        <Head>
          <title>Ficha do Personagem</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <section id="player-sheet">
          <SheetHeader character={character} onChange={setCharacter}/>
          <SheetMenu onChange={setPage}/>
          <Bio bio={bio} page={page} onChange={setBio}/>
          <Sheet character={character} page={page} onChange={setCharacter}/>
          <Spells character={character} page={page} onChange={setCharacter}/>
        </section>
      </html>
  );
}
