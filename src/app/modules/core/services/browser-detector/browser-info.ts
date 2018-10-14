export interface BrowserInfo {
    name: string;
    version: string;
    type: 'mobile' | 'desktop' | 'tablet';
    vendor?: string;
    model?: string;
}
