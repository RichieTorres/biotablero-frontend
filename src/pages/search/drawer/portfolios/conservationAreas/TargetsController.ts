import {
  SmallBarsData,
  SmallBarsDataDetails,
} from "pages/search/shared_components/charts/SmallBars";
import {
  portfoliosByTarget,
  portfolioData,
} from "pages/search/types/portfolios";
import { SmallBarTooltip } from "pages/search/types/charts";
import formatNumber from "utils/format";
import SearchAPI from "utils/searchAPI";

export class TargetsController {
  portfoliosIds;
  constructor() {
    this.portfoliosIds = new Map();
  }

  /**
   * Get all available portfolios
   *
   * @returns List of portfolios
   */
  getPortolfiosList() {
    return SearchAPI.requestPortfoliosList();
  }

  /**
   * Get the portfolios data for all the targets
   *
   * @param areaType area type
   * @param areaId area id
   * @returns Array of promises to be resolved with data for each target
   */
  async getData(areaType: string, areaId: string | number) {
    const targets = await SearchAPI.requestTargetsList(areaType, areaId);
    return targets.map((target) =>
      SearchAPI.requestPortfoliosByTarget(areaType, areaId, target.id).then(
        (res) => {
          const portfolioIds = new Set();
          res.portfolios_data.forEach((portfolio) => {
            portfolioIds.add(portfolio.id);
          });
          this.portfoliosIds.set(target.name, portfolioIds);
          return res;
        }
      )
    );
  }

  /**
   * Get list of available portfolios ids for a given target
   *
   * @param {String} targetName target name
   *
   * @returns {Set<number> | undefined} list of available portfolios ids
   */
  getPortfoliosIdsByTarget(targetName: string) {
    return this.portfoliosIds.get(targetName);
  }

  /**
   * Returns whether a portfolio is into a target
   *
   * @param {String} targetName target name
   * @param {Number} portfolioId portfolio id
   *
   * @returns {Boolean} whether a portfolio is into a target
   */
  isPortfolioInTarget(targetName: string, portfolioId: number) {
    const portfolioIds = this.getPortfoliosIdsByTarget(targetName);
    if (!portfolioIds) return false;
    if (portfolioIds.has(portfolioId)) {
      return true;
    }
    return false;
  }

  /**
   * Transform data structure to be passed to component as a prop
   *
   * @param {Array<portfoliosByTarget>} rawData raw data from RestAPI
   *
   * @returns {Array<SmallBarsData>} transformed data ready to be used by graph component
   */
  getGraphData(rawData: Array<portfoliosByTarget>) {
    const tooltips: Array<SmallBarTooltip> = [];
    const portfolios: Set<string> = new Set();
    const alternateAxisYValues: Record<string, string> = {};
    const transformedData: Array<SmallBarsData> = rawData.map((target) => {
      const objectData: Array<SmallBarsDataDetails> = [];
      target.portfolios_data.forEach((portfolio: portfolioData) => {
        const percentage = (portfolio.value / target.target_national) * 100;
        const info = {
          category: portfolio.short_name,
          value: percentage,
        };
        objectData.push(info);

        tooltips.push({
          group: target.target_name,
          category: portfolio.short_name,
          tooltipContent: [
            portfolio.name,
            `${formatNumber(percentage, 2)} %`,
            `${formatNumber(portfolio.value, 2)} c`,
          ],
        });

        if (!portfolios.has(portfolio.short_name)) {
          portfolios.add(portfolio.short_name);
        }
      });

      const object = {
        group: target.target_name,
        data: objectData,
      };

      alternateAxisYValues[
        target.target_name
      ] = `${target.target_national} ${target.target_units}`;

      return object;
    });

    return {
      transformedData,
      keys: Array.from(portfolios),
      tooltips,
      alternateAxisYValues,
    };
  }
}
