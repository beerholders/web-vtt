import {Typography} from "antd";
import React from "react";
import { css } from "@emotion/react";

const { Title, Paragraph } = Typography;

function plusOrMinus(value){
    if (value >= 0) {
        value = `+${value}`
    }
    return value
}

function getScoreModifier(score) {
    let mod = Math.floor((score - 10)/2);
    return plusOrMinus(mod)
}

const cardStyle = css`
p {
    padding: 0 0 0.5em;
    margin: 0;
}

h1, .card-main p {
    padding: 0;
    margin: 0;
}

h3 {
    margin: 0;
    padding: 0 0 1em;
}

h2 {
    margin-top: 0;
}

header, section {
    border-bottom: 2px solid;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
}

#stats-bar {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    padding: 0.5em;
    text-align: center;
}

#stats-bar div {
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    padding: 0;
}

.no-section-h3 {
    padding: 1em 0 1em 0;
}

table {
    border-spacing: 0;
    width: 100%;
    text-align: center;
    margin-bottom: 1em;

}

th {
    background-color: var(--cor-dos-frames);
    border-bottom: 3px solid var(--cor-das-bordas);
    border-collapse: collapse;
}

td {
    border-bottom: 1px solid var(--cor-das-bordas);
}

ul {
    padding-left: 2em;
}

li {
    padding-bottom: 0.5em;
}
.first-of-section {
    margin-top: 0 !important;
    padding-top: 0 !important;
}

/* Specific to Class Card */

#card-classe h3 {
    margin: 0;
    padding-top: 0.5em;
    padding-bottom: 0;
}

#card-handout #handout-picture img {
    display: block;
    max-height: 400px;
    margin: 10px auto 10px auto;
}
`


function DefaultItem({ item }) {
    return (
        <>
            <Title>{item.name}</Title>
            <Paragraph>{item.desc}</Paragraph>
        </>
    );
}

function SpellItem({ item }) {
    let level_suffix = "th"
    if (item.level === 1) {
        level_suffix = "st";
    } else if (item.level === 2){
        level_suffix = "nd";
    } else if (item.level === 3){
        level_suffix = "rd";
    }
    return (
        <>
            <header>
                <Title>{item.name}</Title>
                <Paragraph id="level-type"><em>{item.level}{level_suffix}-level {item.school.name}</em></Paragraph>
            </header>
            <section id="time-range-components-duration" className="card-main">
                <p><strong>Casting Time</strong> {item.casting_time} {item.ritual && "(Can be cast as Ritual)"}</p>
                <p><strong>Range</strong> {item.range}</p>
                <p><strong>Components</strong> {item.components.join(" ")}</p>
                <p><strong>Duration</strong> {item.duration} {item.concentration && "(Concentration)"}</p>
            </section>
            <section id="description">
                <Paragraph css={{whiteSpace: "pre-wrap"}}>{item.desc.join("\n")}</Paragraph>
            </section>
            <section id="who-casts">
                <p><strong>Classes: </strong> {item.classes.map(classe => classe.name).join(", ")}</p>
                {!!item.subclasses?.length && <p><strong>Subclasses: </strong> {item.subclasses.map(subclasse => subclasse.name).join(", ")}</p>}
            </section>
        </>
    );
}

function MonsterItem({ item }) {
    return (
        <>
            <header>
                <Title>{item.name}</Title>
                <Paragraph><em>{item.size} {item.type}, {item.alignment}</em></Paragraph>
            </header>
            <section id="ac-hp-speed" className="card-main">
                <p><strong>Armor Class</strong> {item.armor_class}</p>
                <p><strong>Hit Points</strong> {item.hit_points} ({item.hit_dice})</p>
                <p><strong>Speed</strong> {Object.entries(item.speed).map(([type, value]) => `${type} ${value}`).join(", ")}</p>
            </section>
            <section id="stats-bar">
                <div id="str">
                    <span><strong>STR</strong></span>
                    <span id="str-value">{item.strength} ({getScoreModifier(item.strength)})</span>
                </div>
                <div id="dex">
                    <span><strong>DEX</strong></span>
                    <span id="dex-value">{item.dexterity} ({getScoreModifier(item.dexterity)})</span>
                </div>
                <div id="con">
                    <span><strong>CON</strong></span>
                    <span id="con-value">{item.constitution} ({getScoreModifier(item.constitution)})</span>
                </div>
                <div id="int">
                    <span><strong>INT</strong></span>
                    <span id="int-value">{item.intelligence} ({getScoreModifier(item.intelligence)})</span>
                </div>
                <div id="wis">
                    <span><strong>WIS</strong></span>
                    <span id="wis-value">{item.wisdom} ({getScoreModifier(item.wisdom)})</span>
                </div>
                <div id="cha">
                    <span><strong>CHA</strong></span>
                    <span id="cha-value">{item.charisma} ({getScoreModifier(item.charisma)})</span>
                </div>
            </section>
            {/*Continuar daqui pra frente (ta tudo chumbado)*/}
            <section id="traits">
                <p><strong>Proficiencies</strong> {item.proficiencies.map(prof => `${prof.proficiency.name} ${plusOrMinus(prof.value)}`).join(", ")}</p>
                {!!item.damage_immunities?.length && <p><strong>Damage Immunities</strong> {item.damage_immunities.join(", ")}</p>}
                {!!item.condition_immunities?.length && <p><strong>Condition Immunities</strong> {item.condition_immunities.join(", ")}</p>}
                {!!item.damage_resistances?.length && <p><strong>Damage Resistences</strong> {item.damage_resistances.join(", ")}</p>}
                {!!item.damage_vulnerabilities?.length && <p><strong>Damage Vulnerabilities</strong> {item.damage_vulnerabilities.join(", ")}</p>}
                {!!Object.entries(item.senses)?.length && <p><strong>Senses</strong> {Object.entries(item.senses).map(([type, value]) => `${type} ${value}`).join(", ")}</p>}
                {!!item.languages?.length && <p><strong>Languages</strong> {item.languages}</p>}
                <p><strong>Challenge</strong> {item.challenge_rating}</p>
                {!!item.special_abilities?.length && item.special_abilities.map(ability => (
                    <p><strong>{ability.name} {ability.usage && `${ability.usage.times} ${ability.usage.type}.`} </strong>{ability.desc}</p>
                ))}
            </section>
            <section id="actions">
                <h3>Actions</h3>
                {!!item.actions?.length && item.actions.map(action => (
                    <p><strong>{action.name}. </strong>{action.desc}</p>
                ))}
            </section>
            {!!item.legendary_actions?.length &&
            <section id="legendary-actions">
                <h3>Legendary Actions</h3>
                {item.legendary_actions.map(action => (
                    <p><strong>{action.name}. </strong>{action.desc}</p>
                ))}
            </section>}
        </>
    );
}

function ClassItem({ item }) {
    return (
        <div id="card-classe" className="card">
            <header>
                <h1>{item.name}</h1>
            </header>
            <section id="class-stats" className="card-main">
                <h3 className="first-of-section">Hit Points</h3>
                <p><strong>Hit Dice:</strong> 1d{item.hit_die}.</p>
                <p><strong>Hit Points at 1st Level:</strong> {item.hit_die} + your Constitution modifier.</p>
                <p><strong>Hit Points at Higher Levels:</strong> 1d{item.hit_die} (or {item.hit_die/2+1}) + your Constitution modifier per {item.name} level after 1st.</p>
                <h3>Proficiencies</h3>
                {!!item.proficiencies?.length && <p>{item.proficiencies.map(prof => `${prof.name}`).join(", ")}</p>}
                {!!item.starting_equipment?.length && (<>
                    <h3>Starting Equipment</h3>
                    <p>You start with the following items</p><ul>
                    {item.starting_equipment.map(eq => (<li>{eq.equipment.name}</li>))}
                </ul></>)}
            </section>
            <div id="class-features">
                {!!item.spellcasting && <section><h2>Spellcasting</h2> {item.spellcasting.info.map(sc => (<p><strong>{sc.name}</strong> {sc.desc}</p>))}</section>}
            </div>
        </div>
    );
}

function RaceItem({ item }) {
    return (
        <div id="card-raça" className="card">
            <header>
                <h1>{item.name}</h1>
            </header>
            <section id="race-bonus" className="card-main">
                <p><strong>Ability Scores</strong> {item.ability_bonuses.map(ability => `${ability.ability_score.name} ${plusOrMinus(ability.bonus)}`).join(", ")}</p>
                <p><strong>Size</strong> {item.size}</p>
                <p><strong>Speed</strong> {item.speed}ft.</p>
            </section>
            <section id="description">
                <p><strong>Age</strong> {item.age}</p>
                <p><strong>Alignment</strong> {item.alignment}</p>
                <p><strong>Size</strong> {item.size_description}</p>
                {!!item.traits?.length && <p><strong>Traits</strong> {item.traits.map(trait => trait.name).join(", ")}</p>}
                <p><strong>Languages</strong> {item.languages.map(language => language.name).join(", ")}</p>
            </section>
        </div>
    );
}

const CategoryComponents = {
    spells: SpellItem,
    monsters: MonsterItem,
    classes: ClassItem,
    races: RaceItem,
};

export function CompendiumItem({ category, item }) {
    if (!item || !category) return null;
    const CategoryComponent = CategoryComponents[category] ?? DefaultItem;
    return (
        <div css={cardStyle}>
            <CategoryComponent item={item} />
        </div>
    );
}
