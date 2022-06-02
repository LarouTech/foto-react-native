import { createContext, useEffect, useState } from 'react';
import { Config, ConfigService } from '../services/configService';

const configService = new ConfigService();

export const ConfigContext = createContext<Config>(null!);

interface ConfigContextProviderProps {
  children: JSX.Element;
}

function ConfigContextProvider(props: ConfigContextProviderProps) {
  const [config, setConfig] = useState<Config>();

  useEffect(() => {
    configService.fetchAppConfig().then((res) => setConfig(res));

    return () => {};
  }, []);

  return (
    <ConfigContext.Provider value={config!}>
      {props.children}
    </ConfigContext.Provider>
  );
}

export default ConfigContextProvider;
