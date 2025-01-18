import { generatePath } from 'react-router-dom';
import { API } from '@/constants/api';
import http from './http';

const useMockData = false;

export async function list(tab, name) {
  try {
    const url = generatePath(API.TOPTOURNAMENTS.LIST, { tab, name }); // leagues/top5
    const queryParams = new URLSearchParams({ name: name, tab: tab }).toString(); // {} to string
    const { data } = await http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}?${queryParams}`);

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    if (error.response) {
      const { response: { data } } = error;
      const { errorCode } = data;
      console.error('API error:', errorCode);
    } else {
      console.error('RESPONSE NOT FOUND');
    }
    return {
      success: false,
    };
  }
}

export async function listMatch(date) {
  const language = localStorage.getItem('language') || process.env.NEXT_PUBLIC_LANGUAGE;
  try {
    const path = generatePath(API.MATCH.URL);
    const queryParams = new URLSearchParams({ date }).toString();
    const { data } = await http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}?${queryParams}`);
    if (language == "vi" && data) data.forEach(item => item.timeStart = new Date(new Date(item.timeStart).getTime() + 7 * 60 * 60 * 1000).toISOString());
    if (data) data.sort((a, b) => new Date(a.timeStart) - new Date(b.timeStart));

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.log(error);

    if (error.response) {
      const { response: { data } } = error;
      const { errorCode } = data;
      console.error('API error:', errorCode);
    } else {
      console.error('RESPONSE NOT FOUND');
    }
    return {
      success: false,
    };
  }
}

export async function GetH2H(id) {
  try { 
    const path = generatePath(API.MATCHES.H2H, { id }); 
    const { data } = await http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`); 

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.log(error);

    if (error.response) {
      const { response: { data } } = error;
      const { errorCode } = data;
      console.error('API error:', errorCode);
    } else {
      console.error('RESPONSE NOT FOUND');
    }
    return {
      success: false,
    };
  }
}


export async function GetODDS(id) {
  try { 
    const path = generatePath(API.MATCHES.ODDS, { id }); 
    const { data } = await http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`); 

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.log(error);

    if (error.response) {
      const { response: { data } } = error;
      const { errorCode } = data;
      console.error('API error:', errorCode);
    } else {
      console.error('RESPONSE NOT FOUND');
    }
    return {
      success: false,
    };
  }
}

export async function GetStatistics(id) {
  try { 
    const path = generatePath(API.MATCHES.Statistics, { id }); 
    const { data } = await http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`); 

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.log(error);

    if (error.response) {
      const { response: { data } } = error;
      const { errorCode } = data;
      console.error('API error:', errorCode);
    } else {
      console.error('RESPONSE NOT FOUND');
    }
    return {
      success: false,
    };
  }
}

export async function GetCoaches(id) {
  try { 
    const path = generatePath(API.MATCHES.Coaches, { id }); 
    const { data } = await http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`); 

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.log(error);

    if (error.response) {
      const { response: { data } } = error;
      const { errorCode } = data;
      console.error('API error:', errorCode);
    } else {
      console.error('RESPONSE NOT FOUND');
    }
    return {
      success: false,
    };
  }
}

export async function GetInjuries(id) {
  try { 
    const path = generatePath(API.MATCHES.Injuries, { id }); 
    const { data } = await http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`); 

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.log(error);

    if (error.response) {
      const { response: { data } } = error;
      const { errorCode } = data;
      console.error('API error:', errorCode);
    } else {
      console.error('RESPONSE NOT FOUND');
    }
    return {
      success: false,
    };
  }
} 

export async function GetAiAnalysis(id) {
  try { 
    const path = generatePath(API.MATCHES.AiAnalysis, { id }); 
    const { data } = await http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`); 

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.log(error);

    if (error.response) {
      const { response: { data } } = error;
      const { errorCode } = data;
      console.error('API error:', errorCode);
    } else {
      console.error('RESPONSE NOT FOUND');
    }
    return {
      success: false,
    };
  }
} 



export async function listWorld() {
  try {
    // cái ni đang mock data nếu như mà sau có api thì xoá cái if dùng trong cái else thui
    if (!useMockData) {
      const response = await fetch('/fake_data/world_history.json');
      if (!response.ok) throw new Error('Failed to fetch mock world data');
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } else {
      const { data } = await http.get(API.TOPTOURNAMENTS.LIST);
      return {
        success: true,
        data: data,
      };
    }
  } catch (error) {
    if (error.response) {
      const { response: { data } } = error;
      const { errorCode } = data;
      console.error('API error:', errorCode);
    } else {
      console.error('RESPONSE NOT FOUND');
    }
    return {
      success: false,
    };
  }
}


export async function getStanding(id, season) {
  try {
    const url = API.LEAGUES.getSTANDING(id, season);
    const { data } = await http.get(url);
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    if (error.response) {
      const { response: { data } } = error;
      const { errorCode } = data;
      console.error('API error:', errorCode);
    } else {
      console.error('RESPONSE NOT FOUND');
    }
    return {
      success: false,
    };
  }
}