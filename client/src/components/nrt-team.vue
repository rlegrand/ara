<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~ Copyright (C) 2019 by the ARA Contributors
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ you may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~ 	 http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
<template>
  <div v-if="qualitiesPerTeamAndSeverity(team.id, '*').total" style="margin: 8px 0;">
    <Row type="flex" :gutter="4" justify="space-around">
      <i-col span="4" style="line-height: 21px; font-size: 0.8em; color: gray; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        {{team.name}}
      </i-col>
      <i-col :span="(24 - 4) / execution.qualitySeverities.length" v-for="qualitySeverity in execution.qualitySeverities" :key="qualitySeverity.severity.code">
        <nrt-progress
          :data-nrt="'ExecutionsAndErrorsCartRowTeam_' + qualitySeverity.severity.code + '_' + run.country.code + '_' + run.type.code + '_' + team.name + '_' + execution.id "
          :execution="execution"
          :run="run"
          :counts="qualitiesPerTeamAndSeverity(team.id, qualitySeverity.severity.code)"
          :severityCode="qualitySeverity.severity.code"
          :teamId="team.id"
          :small="true"
          :routerReplace="routerReplace" />
      </i-col>
    </Row>
  </div>
</template>

<script>
  import nrtProgressComponent from './nrt-progress'

  export default {
    props: [ 'execution', 'run', 'team', 'routerReplace' ],

    components: {
      'nrt-progress': nrtProgressComponent
    },

    methods: {
      computeNrtPercent (failed, passed) {
        return Math.trunc(passed * 100 / (failed + passed))
      },

      qualitiesPerTeamAndSeverity (teamId, severityCode) {
        if (this.run &&
            this.run.qualitiesPerTeamAndSeverity &&
            this.run.qualitiesPerTeamAndSeverity['' + teamId] &&
            this.run.qualitiesPerTeamAndSeverity['' + teamId][severityCode]) {
          return this.run.qualitiesPerTeamAndSeverity['' + teamId][severityCode]
        }
        return {
          total: 0,
          handled: 0,
          unhandled: 0,
          passed: 0
        }
      }
    }
  }
</script>

<style lang="less"> /* NOT scopped */
  .line-info {
    margin: 8px 0 2px;
    padding: 0;
    line-height: 12px;
    font-size: 12px;
    text-transform: uppercase;

    .ivu-progress-inner {
      background-color: #ed3f14;
    }
  }
</style>
